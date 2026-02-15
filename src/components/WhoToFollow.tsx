import Link from "next/link";
import Image from "./Image";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import FollowButton from "./FollowButton";

const WhoToFollow = async () => {
  // --- CONFIGURATION ---
  const MAX_RECOMMENDATIONS = 10; // Change this number to show more/less

  try {
    const { userId } = await auth();

    // 1. Security Check: If no user, don't render the sidebar widget
    if (!userId) return null;

    // 2. Fetch the list of people the user already follows
    // We only need the IDs to exclude them from the suggestions
    const followData = await prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });
    const followedIds = followData.map((f) => f.followingId);

    /**
     * 3. STRATEGY A: "Friends of Friends" (Mutuals)
     * Find users who are followed by the people you follow.
     */
    let results = await prisma.user.findMany({
      where: {
        id: { not: userId, notIn: followedIds },
        following: {
          some: { followerId: { in: followedIds } },
        },
      },
      take: MAX_RECOMMENDATIONS,
      select: { id: true, displayName: true, username: true, UserImg: true },
    });

    /**
     * 4. STRATEGY B: "Global Popularity" (Fallback)
     * If Strategy A didn't find enough people, fill the remaining slots
     * with popular users (ordered by follower count).
     */
    if (results.length < MAX_RECOMMENDATIONS) {
      const existingIds = results.map((r) => r.id);

      const leftovers = await prisma.user.findMany({
        where: {
          id: {
            not: userId,
            notIn: [...followedIds, ...existingIds],
          },
        },
        take: MAX_RECOMMENDATIONS - results.length,
        orderBy: {
          following: { _count: "desc" }, // Most followed users first
        },
        select: { id: true, displayName: true, username: true, UserImg: true },
      });

      results = [...results, ...leftovers];
    }

    // 5. If the database is empty, don't show an empty box
    if (results.length === 0) return null;
    console.log("Who to follow results:", results);
    return (
      <div className="p-4 rounded-2xl border border-borderGray flex flex-col gap-4">
        <h2 className="text-xl font-bold px-1">Who to follow</h2>

        {results.map((person) => (
          <div
            className="flex items-center justify-between gap-2"
            key={person.id}>
            {/* User Profile Info */}
            <div className="flex items-center gap-2 flex-1">
              <div className="relative rounded-full overflow-hidden w-10 h-10 flex-shrink-0">
                <Image
                  src={person.UserImg || "/general/noAvatar.png"}
                  alt={person.username}
                  width={100}
                  height={100}
                  tr={true}
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-md font-bold truncate">
                  {person.displayName || person.username}
                </span>
                <span className="text-textGray text-sm truncate">
                  @{person.username}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <FollowButton
              userId={person.id} // Use person.id from the loop
              isFollowed={false} // Since we filtered for 'notIn: followedIds', this is always false
              isSelf={false} // Since we filtered for 'not: userId', this is always false
            />
          </div>
        ))}

        <Link href="/" className="text-iconBlue text-sm hover:underline px-1">
          Show More
        </Link>
      </div>
    );
  } catch (error) {
    console.error("Recommendations Error:", error);
    return null;
  }
};

export default WhoToFollow;
