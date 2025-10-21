/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { number, z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { projectSchema, type ProjectFormValues } from "@/lib/validation";
import { Trash2, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import createProjectAction from "./actions";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { postProject } from "@/services/hub";
import { getIdentity } from "@/services/identity";
import { useAccount } from "wagmi";
import ActionAlertDialog from "@/components/ActionAlertDialog";
import ConfirmDialog from "@/components/ConfirmDialog";

import { createProject, createProjectLink, ProjectCreate } from "@/repository/api";
import { keccak256 } from "ethers";

const CreateGameProjectPage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const { address } = useAccount();

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      gameName: "",
      description: "",
      devName: "",
      fundingTarget: 0,
      milestones: [{ date: undefined, target: "" }],
      externalLinks: [],
    },
  });

  const {
    fields: milestoneFields,
    append: appendMilestone,
    remove: removeMilestone,
  } = useFieldArray({
    control: form.control,
    name: "milestones",
  });

  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    control: form.control,
    name: "externalLinks",
  });

  const router = useRouter();

  const onSubmit = async (values: ProjectFormValues) => {
    setIsSubmitting(true);
    try {
      const timestamps = values.milestones.map((m) =>
        Math.floor(new Date(m.date!).getTime() / 1000)
      );

      const targets = values.milestones.map((m) => m.target);

      const currency = values.fundingCurrency == "IDRX" ? 0 : 1;

      // TODO: Ganti ini dengan logika upload file Anda
      const coverImageUrl = "https://nusahub.kevinchr.com/placeholder-uploaded-image.jpg";

      const projectApiData: ProjectCreate = {
        title: values.gameName,
        description: values.description,
        developer_name: values.devName,
        genre: values.genre,
        game_type: values.gameType,
        cover_image_url: coverImageUrl, // <-- Hasil upload file
        creator_wallet_address: address ?? "" // <-- use destructured address
      };

      console.log("Submitting to backend API:", projectApiData);
      const backendProject = await createProject(projectApiData);
      const newProjectId = backendProject.id;
      if (!newProjectId) {
        throw new Error("Failed to get Project ID from backend.");
      }

      console.log(`Submitting to smart contract with ID: ${newProjectId}`);
      //   const result = await createProjectAction(values);

      const uuidString = newProjectId;
      const uuidNoHyphens = uuidString.replace(/-/g, '');
      const uuidHex = "0x" + uuidNoHyphens;
      const uuidAsUint256 = BigInt(uuidHex);
      console.log(uuidAsUint256.toString());

      // ganti projectId dari backend ya angka 100 ini
      const scPostProjectResult = await postProject(
        Number(uuidAsUint256),
        values.gameName,
        currency,
        values.fundingTarget,
        timestamps,
        targets
      );

      if (scPostProjectResult) {
        if (values.externalLinks && values.externalLinks.length > 0) {
          console.log(`Adding ${values.externalLinks.length} external links...`);
          await Promise.all(
            values.externalLinks.map((link) =>
              createProjectLink(newProjectId, {
                name: link.title,
                url: link.url,
              })
            )
          );
        }
        console.log(scPostProjectResult);
        toast.success("Project posted successfully!");
        // diganti ya kocak angkanya
        router.push(`/game-projects/${newProjectId}`);
      } else {
        toast.error("Failed to create project!", {
          description: "Please try again later.",
        });
      }

      //   if (result.success) {
      //     toast.success(result.message);
      //     router.push(`/game-projects/1`);
      //   } else {
      //     toast.error("Failed to create project", {
      //       description: result.error,
      //     });
      //   }
    } catch (error) {
      toast.error("An unexpected error occurred", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const [identity, setIdentity] = useState("");
  const [showIdentityDialog, setShowIdentityDialog] = useState(false);

  const fetchIdentity = async () => {
    if (address) {
      try {
        const result = await getIdentity(String(address ?? ""));
        setIdentity(String(result ?? ""));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // baru setLoading(false) di sini
      }
    } else {
      setLoading(false); // kalau address undefined
    }
  };
  useEffect(() => {
    fetchIdentity();
  }, [address]);

  useEffect(() => {
    if (!loading && !identity) {
      setShowIdentityDialog(true); // buka dialog
    }
  }, [identity, loading]);

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Create Your Game Project
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Fill in the details below to get your project listed and funded.
        </p>
      </div>

      <ConfirmDialog
        open={showIdentityDialog}
        title="Identity Verification Required"
        description="You need to verify your identity before proceeding."
        onConfirm={() => router.push("/verification")}
        variant="destructive"
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* --- Informasi Dasar --- */}
          <FormField
            control={form.control}
            name="gameName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Game Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Skyborne Legacy"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="devName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Developer / Studio Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Nusantara Arts"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your awesome game..."
                    className="resize-y"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* --- Gambar Game --- */}
          <FormField
            control={form.control}
            name="gameImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Game Cover Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                    disabled={isSubmitting}
                  />
                </FormControl>
                {imagePreview && (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={200}
                    height={100}
                    className="mt-4 rounded-md object-cover"
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* --- Detail Proyek --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="rpg" disabled={isSubmitting}>
                        RPG
                      </SelectItem>
                      <SelectItem value="action" disabled={isSubmitting}>
                        Action
                      </SelectItem>
                      <SelectItem value="strategy" disabled={isSubmitting}>
                        Strategy
                      </SelectItem>
                      <SelectItem value="simulation" disabled={isSubmitting}>
                        Simulation
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gameType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Game Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center space-x-4 pt-2"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="web2"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Web2</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="web3"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Web3</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* --- Funding Section --- */}
          <div className="p-4 border rounded-lg space-y-4 bg-secondary/50">
            <FormField
              control={form.control}
              name="fundingCurrency"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Funding Currency</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="IDRX"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">IDRX</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="USDT"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">USDT</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fundingTarget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Funding Target (in {form.watch("fundingCurrency")})
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="50000"
                      {...field}
                      min="0"
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        field.onChange(isNaN(value) || value < 0 ? 0 : value);
                      }}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* --- Milestones --- */}
          <div>
            <FormLabel>Project Milestones</FormLabel>
            <FormDescription>
              Define the development phases for your investors.
            </FormDescription>
            <div className="space-y-4 mt-4">
              {milestoneFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col md:flex-row gap-4 border p-4 rounded-lg items-start"
                >
                  <FormField
                    control={form.control}
                    name={`milestones.${index}.date`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                disabled={isSubmitting}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd MMMM yyyy")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`milestones.${index}.target`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Target</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Alpha Release"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex-shrink-0">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeMilestone(index)}
                      disabled={isSubmitting}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendMilestone({ date: undefined, target: "" })}
                disabled={isSubmitting}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Milestone
              </Button>
            </div>
          </div>

          {/* --- External Links --- */}
          <div>
            <FormLabel>External Links (Optional)</FormLabel>
            <FormDescription>
              Link to your website, trailer, etc.
            </FormDescription>
            <div className="space-y-4 mt-4">
              {linkFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex gap-4 border p-4 rounded-lg"
                >
                  <FormField
                    control={form.control}
                    name={`externalLinks.${index}.title`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Website"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`externalLinks.${index}.url`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://..."
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeLink(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendLink({ title: "", url: "" })}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Link
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader className="mr-2" />}
            {isSubmitting ? "Creating Project..." : "Create Project"}
          </Button>
        </form>
      </Form>
    </div>
  );

};

export default CreateGameProjectPage;
