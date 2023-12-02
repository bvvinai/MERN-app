import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
    const available = false;
    const { first_name, last_name, email, gender, avatar, domain } = await request.json();
    await connectMongoDB();
    await User.create({ first_name, last_name, email, gender, avatar, domain, available });
    return NextResponse.json({ message: "User Created" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const users = await User.find();
    return NextResponse.json({ users });
}

export async function getUsers() {
    await connectMongoDB();
    const users = await User.find();
    return JSON.parse(JSON.stringify(users));
}