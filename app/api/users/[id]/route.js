import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { first_name, last_name, email, gender, avatar, domain } = await request.json();
    await connectMongoDB();
    await User.findByIdAndUpdate(id, { first_name, last_name, email, gender, avatar, domain });
    return NextResponse.json({ message: "User Updated" }, { status: 201 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const user = await User.findOne({ _id: id });
    return NextResponse.json({ user }, { status: 200 });
}

export async function DELETE(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
}