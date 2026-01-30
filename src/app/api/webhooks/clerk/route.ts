import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/prisma";

export async function POST(req: Request) {
  // 1. Get the secret
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // 2. Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // 3. If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // 4. Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // 5. Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // 6. Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // 7. Handle the event
  const eventType = evt.type;

  console.log(`Received event: ${body}`);

  if (eventType === "user.created") {
    try {
      // call  function to create a user in  database
      await prisma.user.create({
        data: {
          id: evt.data.id,
          email: evt.data.email_addresses[0]?.email_address || "",
          username: evt.data.username || "",
        },
      });
    } catch (err) {
      console.error("Error creating user:", err);
      return new Response("error:  failed to create user", { status: 500 });
    }
  }
  // 8. Handle user.deleted event
  if (eventType === "user.deleted") {
    try {
      // call  function to delte a user in  database
      await prisma.user.delete({
        where: {
          id: evt.data.id,
        },
      });
      return new Response("user deleted", { status: 200 });
    } catch (err) {
      console.error("Error deleting user:", err);
      return new Response("error:  failed to delete user", { status: 500 });
    }
  }
  // handle user.updated event

  return new Response("webhook received", { status: 200 });
}
