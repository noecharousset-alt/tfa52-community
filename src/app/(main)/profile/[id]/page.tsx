import { users } from "@/lib/mock-data";
import { ProfileDetail } from "./profile-detail";

export function generateStaticParams() {
  return users.map((user) => ({ id: user.id }));
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProfileDetail id={id} />;
}
