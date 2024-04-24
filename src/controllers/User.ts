'use server';

import { authOptions } from "@/lib/auth";
import connectDatabase from "@/lib/mongodb";
import Users from "@/models/Users";
import { AvailabilityBlock, AvailabilityScope, TClientDetails, UserAddress, UserPerson } from "@/types/User";
import moment from "moment";
import { getServerSession } from "next-auth";
import { getCsrfToken, getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function getUserAdresses():Promise<UserAddress[]>{
    await connectDatabase();
    const session = await getServerSession(authOptions);

    if(!session?.user?._id) return [];

    let user = await Users.findOne({ _id: session.user._id }, { addresses: 1 });

    if(!user) return [];

    return user.addresses;
}

export async function getUserPeople():Promise<UserPerson[]>{
    await connectDatabase();
    const session = await getServerSession(authOptions);

    if(!session?.user?._id) return [];

    let user = await Users.findOne({ _id: session.user._id }, { people: 1 });

    if(!user) return [];

    return user.people;
}

export const GetClientDetails = async (clientID: string): Promise<TClientDetails | null> => {
    await connectDatabase();

    if(!clientID) return null;

    let client:TClientDetails | null = await Users.findById(clientID, {
        firstName: 1,
        lastName: 1,
    }).lean();

    return client;
}


export async function getAvailability():Promise<AvailabilityScope[]>{
    await connectDatabase();

    const session = await getServerSession(authOptions);

    if(!session?.user?._id) return [];

    let user = await Users.findById(session.user._id, { availability: 1 });
    let userAvailability:AvailabilityScope[] = user?.availability ?? [];
    userAvailability = userAvailability.filter(x => moment(x.date).isSameOrAfter(moment(), 'day'));

    const maxAdvancedDays = 31;
    const defaultBlockDuration = 120;
    const blocksPerDay = 24 * 60 / defaultBlockDuration;

    const baseDate = new Date();
    baseDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < maxAdvancedDays; i++) {
        const dayBlocks: AvailabilityBlock[] = [];
        let iterationDate = new Date(baseDate.getTime() + i * 24 * 60 * 60000);

        let currentAvailabilityDay = userAvailability.find(x => x.date.getTime() === iterationDate.getTime());

        for (let j = 0; j < blocksPerDay; j++) {
            const startTime = new Date(iterationDate.getTime() + j * defaultBlockDuration * 60000);
            const endTime = new Date(iterationDate.getTime() + (j + 1) * defaultBlockDuration * 60000);

            let currentAvailabilityBlock = currentAvailabilityDay?.blocks.find(x => x.startTime.getTime() === startTime.getTime());

            if(currentAvailabilityBlock){
                dayBlocks.push(currentAvailabilityBlock);
            }
            else{
                dayBlocks.push({
                    id: `block_${iterationDate.getFullYear()}_${iterationDate.getMonth()}_${iterationDate.getDate()}_${j}`,
                    startTime,
                    endTime,
                    duration: defaultBlockDuration,
                    status: 'pending'
                });
            }
        }

        if(!currentAvailabilityDay){
            userAvailability.push({
                id: `day_${iterationDate.getFullYear()}_${iterationDate.getMonth()}_${iterationDate.getDate()}`,
                date: new Date(baseDate.getTime() + i * 24 * 60 * 60000),
                blocks: dayBlocks
            });
        }
        else{
            currentAvailabilityDay.blocks = dayBlocks;
        }
    }

    //Sort by date and blocks startTime
    userAvailability = userAvailability.sort((a, b) => a.date.getTime() - b.date.getTime());
    userAvailability = userAvailability.map(x => {
        x.blocks = x.blocks.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
        return x;
    });

    return userAvailability;
}

export async function setAvailability(userID: string, availability: AvailabilityScope[]):Promise<boolean>{
    await connectDatabase();

    let user = await Users.findById(userID, { availability: 1 });
    let userAvailability:AvailabilityScope[] = user?.availability ?? [];

    //Remove all past days
    userAvailability = userAvailability.filter(x => moment(x.date).isSameOrAfter(moment(), 'day'));

    //Iterate through availability nad set date to date object
    availability.forEach((day, index) => {
        day.date = new Date(day.date);
        day.blocks.forEach((block, blockIndex) => {
            block.startTime = new Date(block.startTime);
            block.endTime = new Date(block.endTime);
        });
    });


    //Merge new availability with user availability
    availability.forEach((day, index) => {
        let dayIndex = userAvailability.findIndex(x => x.id === day.id);
        //If day exists, update blocks, else add day
        if(dayIndex !== -1)
        {
            let dayBlocks = userAvailability[dayIndex].blocks;

            //Merge new blocks with user blocks
            day.blocks.forEach((block, blockIndex) => {
                let blockInDayIndex = dayBlocks.findIndex(x => x.id === block.id);

                if(blockInDayIndex !== -1){
                    let blockStatus = dayBlocks[blockInDayIndex].status;

                    if(['booked', 'unavailable'].includes(blockStatus)) return;
                }

                //If block exists, update status, else add block
                if(blockInDayIndex !== -1)
                    dayBlocks[blockInDayIndex] = {
                        ...dayBlocks[blockInDayIndex],
                        status: block.status,
                    }
                else
                    dayBlocks.push(block);
            });
        }
        else
            userAvailability.push(day);
    });


    //Sort by date and blocks startTime
    userAvailability = userAvailability.sort((a, b) => a.date.getTime() - b.date.getTime());
    userAvailability = userAvailability.map(x => {
        x.blocks = x.blocks.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
        return x;
    });

    await Users.updateOne({ _id: userID }, { $set: { availability: userAvailability}});

    return true;
}