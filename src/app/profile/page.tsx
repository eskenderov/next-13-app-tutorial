import { Heading, Text } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { authConfig } from "../api/auth/[...nextauth]/options";
import { GuardText } from "@/components/GuardText";

const ProfilePage = async () => {
  const session = await getServerSession(authConfig);
  if (!session?.user) {
    return <GuardText pageName="profile" />;
  }
  return (
    <main className="page">
      <div className="container">
        <Heading as="h3" mb="28px">
          Hello {session.user?.username}!
        </Heading>
        <Text fontSize="2xl">Your email: {session.user?.email}</Text>
      </div>
    </main>
  );
};

export default ProfilePage;
