import React, { useEffect, useState } from 'react';

const Clock = () => {
    const [days, setDays] = useState();
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();

    let interval;

    const countDown = () => {
        const destination = new Date('february 26, 2023').getTime();

        interval = setInterval(() => {
            const now = new Date().getTime();
            const different = destination - now;

            const days = Math.floor(different / (1000 * 60 * 60 * 24));
            const hours = Math.floor((different % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((different % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((different % (1000 * 60)) / 1000);

            if (destination < 0) clearInterval(interval.current);
            else {
                setDays(days);
                setHours(hours);
                setMinutes(minutes);
                setSeconds(seconds);
            }
        });
    };

    useEffect(() => {
        countDown();
    });

    return (
        <div className=" flex items-center gap-9">
            <div className="clock__data flex items-center gap-3">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold">{days}</h1>
                    <h5 className="font-medium">Days</h5>
                </div>
                <span className="text-3xl pb-[7px]">:</span>
            </div>
            <div className="clock__data flex items-center gap-3">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold">{hours}</h1>
                    <h5 className="font-medium">Hours</h5>
                </div>
                <span className="text-3xl pb-[7px]">:</span>
            </div>
            <div className="clock__data flex items-center gap-3">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold">{minutes}</h1>
                    <h5 className="font-medium">Minutes</h5>
                </div>
                <span className="text-3xl pb-[7px]">:</span>
            </div>
            <div className="clock__data flex items-center gap-3">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold">{seconds}</h1>
                    <h5 className="font-medium">Seconds</h5>
                </div>
            </div>
        </div>
    );
};

export default Clock;
