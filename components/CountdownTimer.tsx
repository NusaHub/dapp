"use client";

import { useState, useEffect } from 'react';

const calculateTimeLeft = (targetDate: Date) => {
    const difference = +targetDate - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }
    return timeLeft;
};

const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center">
        <span className="text-2xl font-bold tracking-tighter">{String(value).padStart(2, '0')}</span>
        <span className="text-xs text-muted-foreground uppercase">{label}</span>
    </div>
);

interface CountdownTimerProps {
    targetDate: Date;
    title: string;
    endMessage: string;
}

const CountdownTimer = ({ targetDate, title, endMessage }: CountdownTimerProps) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    const isFinished = !timeLeft.days && !timeLeft.hours && !timeLeft.minutes && !timeLeft.seconds;

    return (
        <div>
            <h3 className="font-semibold mb-2 text-center">{title}</h3>
            {isFinished ? (
                <p className="text-center font-bold text-primary">{endMessage}</p>
            ) : (
                <div className="grid grid-cols-4 gap-2 text-center">
                    <TimeUnit value={timeLeft.days} label="Days" />
                    <TimeUnit value={timeLeft.hours} label="Hours" />
                    <TimeUnit value={timeLeft.minutes} label="Mins" />
                    <TimeUnit value={timeLeft.seconds} label="Secs" />
                </div>
            )}
        </div>
    );
}

export default CountdownTimer;