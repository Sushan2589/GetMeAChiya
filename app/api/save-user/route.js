import connectDb from "@/db/connectDB";
import User from "@/models/User";

export async function POST(req) {
  const { email, username, name, profilepic } = await req.json();

  if (!username) {
    return new Response("Username is required", { status: 400 });
  }

  await connectDb();

  const existingUser = await User.findOne({ username });

  if (!existingUser) {
    await User.create({
      email,
      username,
      name,
      profilepic,
    });

    return new Response("User created", { status: 201 });
  }

  return new Response("User already exists", { status: 200 });
}
