import axios, { AxiosInstance, AxiosError } from 'axios';

// KONFIGURASI AXIOS

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api: AxiosInstance = axios.create({
  baseURL: `${baseURL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleError = (error: unknown): Error => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;
    const errorMessage = axiosError.response?.data?.error || axiosError.message;
    console.error('Axios error:', errorMessage, axiosError.response);
    return new Error(errorMessage);
  } else {
    // Error JavaScript biasa
    console.error('Unexpected error:', error);
    return new Error('Terjadi kesalahan tidak terduga');
  }
};

export interface UserProfile {
  created_at?: string;
  email?: string;
  kyc_status?: string;
  profile_image_url?: string;
  updated_at?: string;
  username?: string;
  wallet_address?: string;
}

export interface Project {
  cover_image_url?: string;
  created_at?: string;
  creator_wallet_address?: string;
  description?: string;
  developer_name?: string;
  game_type?: string;
  genre?: string;
  id?: string;
  investor_wallet_addresses?: string[];
  title?: string;
  updated_at?: string;
}

export interface ProjectCreate {
  cover_image_url?: string;
  creator_wallet_address: string;
  description?: string;
  developer_name?: string;
  game_type?: string;
  genre?: string;
  title?: string;
}

export interface ProjectPatch {
  cover_image_url?: string;
  description?: string;
  developer_name?: string;
  game_type?: string;
  genre?: string;
  title?: string;
}

export interface Comment {
  author_wallet_address?: string;
  content?: string;
  created_at?: string;
  id?: string;
  parent_comment_id?: string;
  project_id?: string;
  updated_at?: string;
}

export interface CommentCreate {
  author_wallet_address?: string;
  content?: string;
  parent_comment_id?: string;
}

export interface ExternalLink {
  created_at?: string;
  id?: string;
  name?: string;
  project_id?: string;
  updated_at?: string;
  url?: string;
}

export interface ExternalLinkCreate {
  name?: string;
  url?: string;
}

export interface AddInvestorRequest {
  wallet_address?: string;
}

export interface InvestorsResponse {
  investors?: string[];
}

export interface GenericMessage {
  message?: string;
}

export interface ErrorResponse {
  error?: string;
}

// SERVICE: PROJECTS

/**
 * (READ) Get all projects
 * GET /projects
 */
export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const response = await api.get<Project[]>('/projects');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * (CREATE) Create new project
 * POST /projects
 */
export const createProject = async (project: ProjectCreate): Promise<Project> => {
  try {
    const response = await api.post<Project>('/projects', project);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * (READ) Get project by ID
 * GET /projects/{id}
 */
export const getProjectById = async (id: string): Promise<Project> => {
  try {
    const response = await api.get<Project>(`/projects/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * (UPDATE) Update project
 * PATCH /projects/{id}
 */
export const updateProject = async (id: string, project: ProjectPatch): Promise<Project> => {
  try {
    const response = await api.patch<Project>(`/projects/${id}`, project);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * (READ) Get project investors
 * GET /projects/{id}/investors
 */
export const getProjectInvestors = async (id: string): Promise<InvestorsResponse> => {
  try {
    const response = await api.get<InvestorsResponse>(`/projects/${id}/investors`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * (CREATE) Add investor to project
 * POST /projects/{id}/investors
 */
export const addProjectInvestor = async (id: string, data: AddInvestorRequest): Promise<GenericMessage> => {
  try {
    const response = await api.post<GenericMessage>(`/projects/${id}/investors`, data);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * (DELETE) Remove investor from project
 * DELETE /projects/{id}/investors/{walletAddress}
 */
export const removeProjectInvestor = async (id: string, walletAddress: string): Promise<GenericMessage> => {
  try {
    const response = await api.delete<GenericMessage>(`/projects/${id}/investors/${walletAddress}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};


// SERVICE: COMMENTS

/**
 * (READ) Get project comments
 * GET /projects/{id}/comments
 */
export const getProjectComments = async (id: string): Promise<Comment[]> => {
  try {
    const response = await api.get<Comment[]>(`/projects/${id}/comments`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * (CREATE) Create comment
 * POST /projects/{id}/comments
 */
export const createComment = async (id: string, comment: CommentCreate): Promise<Comment> => {
  try {
    const response = await api.post<Comment>(`/projects/${id}/comments`, comment);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};


// SERVICE: EXTERNAL LINKS

/**
 * (READ) Get project external links
 * GET /projects/{id}/links
 */
export const getProjectLinks = async (id: string): Promise<ExternalLink[]> => {
  try {
    const response = await api.get<ExternalLink[]>(`/projects/${id}/links`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * (CREATE) Create external link
 * POST /projects/{id}/links
 */
export const createProjectLink = async (id: string, link: ExternalLinkCreate): Promise<ExternalLink> => {
  try {
    const response = await api.post<ExternalLink>(`/projects/${id}/links`, link);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * (UPDATE) Update external link
 * PUT /projects/{id}/links/{linkId}
 */
export const updateProjectLink = async (id: string, linkId: string, link: ExternalLinkCreate): Promise<ExternalLink> => {
  try {
    const response = await api.put<ExternalLink>(`/projects/${id}/links/${linkId}`, link);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * (DELETE) Delete external link
 * DELETE /projects/{id}/links/{linkId}
 */
export const deleteProjectLink = async (id: string, linkId: string): Promise<GenericMessage> => {
  try {
    const response = await api.delete<GenericMessage>(`/projects/${id}/links/${linkId}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};



// ---

// export const uploadImage(file: File): Promise<string> {
//   const formData = new FormData();
//   formData.append("file", file); // ganti key kalau backend kamu pakai nama lain

//   const res = await fetch("http://127.0.0.1:8080/api/upload", {
//     method: "POST",
//     body: formData,
//   });

//   if (!res.ok) {
//     const text = await res.text().catch(() => "");
//     throw new Error(`Upload failed (${res.status}). ${text}`);
//   }

//   const json = await res.json();
//   if (!json?.file_url) {
//     throw new Error(json?.message || "Upload response missing file_url");
//   }
//   return json.file_url as string;
// }