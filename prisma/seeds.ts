import { PrismaClient } from "../src/generated/prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting comprehensive reset and seed...");

  // 1. CLEANUP
  await prisma.like.deleteMany({});
  await prisma.savedPosts.deleteMany({});
  await prisma.follow.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("🧹 Database cleared.");

  // 2. CREATE USERS WITH FULL PROFILES (Extended to 10 users)
  const users = await Promise.all([
    prisma.user.create({
      data: {
        id: "user1",
        email: "alice@example.com",
        username: "alice",
        displayName: "Alice Wonder",
        bio: "Full-stack developer and coffee enthusiast. Building the future of social media. 🚀",
        location: "San Francisco, CA",
        job: "Senior Software Engineer",
        website: "https://alice.dev",
        UserImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
        userCover:
          "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
      },
    }),
    prisma.user.create({
      data: {
        id: "user2",
        email: "bob@builder.com",
        username: "bob_builder",
        displayName: "Bob the Builder",
        bio: "Can we fix it? Yes we can! | Infrastructure & Cloud Architect",
        location: "London, UK",
        job: "DevOps Lead",
        website: "https://bobfixes.it",
        UserImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
        userCover:
          "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg",
      },
    }),
    prisma.user.create({
      data: {
        id: "user3",
        email: "charlie@web.com",
        username: "charlie_ux",
        displayName: "Charlie Design",
        bio: "Making the web beautiful, one pixel at a time. Pixel perfectionist.",
        location: "Berlin, Germany",
        job: "Product Designer",
        website: "https://charlie.design",
        UserImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=charlie",
        userCover:
          "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
      },
    }),
    prisma.user.create({
      data: {
        id: "user4",
        email: "dave@tech.com",
        username: "dave_dev",
        displayName: "Dave Jenkins",
        bio: "I turn caffeine into code. TypeScript & React fanboy.",
        location: "New York, NY",
        job: "Frontend Developer",
        website: "https://github.com/dave",
        UserImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=dave",
        userCover:
          "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg",
      },
    }),
    prisma.user.create({
      data: {
        id: "user5",
        email: "emma@startup.io",
        username: "emma_founder",
        displayName: "Emma Startup",
        bio: "Building the next unicorn 🦄 | CEO @ TechVentures | Angel Investor",
        location: "Austin, TX",
        job: "Founder & CEO",
        website: "https://techventures.io",
        UserImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
        userCover:
          "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg",
      },
    }),
    prisma.user.create({
      data: {
        id: "user6",
        email: "frank@data.ai",
        username: "frank_ml",
        displayName: "Frank Data",
        bio: "Machine Learning Engineer | AI Enthusiast | Python & TensorFlow",
        location: "Seattle, WA",
        job: "ML Engineer",
        website: "https://frankml.com",
        UserImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=frank",
        userCover:
          "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg",
      },
    }),
    prisma.user.create({
      data: {
        id: "user7",
        email: "grace@mobile.dev",
        username: "grace_ios",
        displayName: "Grace Mobile",
        bio: "iOS Developer | Swift lover | Building apps that matter 📱",
        location: "Toronto, Canada",
        job: "iOS Developer",
        website: "https://graceapps.dev",
        UserImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=grace",
        userCover:
          "https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg",
      },
    }),
    prisma.user.create({
      data: {
        id: "user8",
        email: "henry@security.net",
        username: "henry_sec",
        displayName: "Henry Security",
        bio: "Cybersecurity Expert | Ethical Hacker | Keeping the internet safe 🔒",
        location: "Tel Aviv, Israel",
        job: "Security Architect",
        website: "https://henrysec.net",
        UserImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=henry",
        userCover:
          "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
      },
    }),
    prisma.user.create({
      data: {
        id: "user9",
        email: "iris@content.media",
        username: "iris_creator",
        displayName: "Iris Creative",
        bio: "Content Creator | Video Editor | Storyteller ✨",
        location: "Los Angeles, CA",
        job: "Content Creator",
        website: "https://iriscreates.com",
        UserImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=iris",
        userCover:
          "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg",
      },
    }),
    prisma.user.create({
      data: {
        id: "user10",
        email: "jack@backend.dev",
        username: "jack_backend",
        displayName: "Jack Backend",
        bio: "Backend wizard | Node.js & Go | API design enthusiast",
        location: "Singapore",
        job: "Backend Engineer",
        website: "https://jackbackend.dev",
        UserImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=jack",
        userCover:
          "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg",
      },
    }),
  ]);

  console.log("✅ 10 Users with full profiles created.");

  // 3. CREATE EXTENSIVE FOLLOW RELATIONSHIPS
  await prisma.follow.createMany({
    data: [
      // Alice follows almost everyone
      { followerId: "user1", followingId: "user2" },
      { followerId: "user1", followingId: "user3" },
      { followerId: "user1", followingId: "user5" },
      { followerId: "user1", followingId: "user6" },
      { followerId: "user1", followingId: "user7" },
      { followerId: "user1", followingId: "user8" },

      // Bob's network
      { followerId: "user2", followingId: "user1" },
      { followerId: "user2", followingId: "user3" },
      { followerId: "user2", followingId: "user4" },
      { followerId: "user2", followingId: "user10" },

      // Charlie's connections
      { followerId: "user3", followingId: "user1" },
      { followerId: "user3", followingId: "user2" },
      { followerId: "user3", followingId: "user9" },
      { followerId: "user3", followingId: "user4" },

      // Dave follows tech people
      { followerId: "user4", followingId: "user1" },
      { followerId: "user4", followingId: "user2" },
      { followerId: "user4", followingId: "user6" },
      { followerId: "user4", followingId: "user10" },

      // Emma's network (popular founder)
      { followerId: "user5", followingId: "user1" },
      { followerId: "user5", followingId: "user2" },
      { followerId: "user5", followingId: "user6" },
      { followerId: "user5", followingId: "user8" },

      // Frank follows AI/ML crowd
      { followerId: "user6", followingId: "user1" },
      { followerId: "user6", followingId: "user5" },
      { followerId: "user6", followingId: "user10" },

      // Grace's mobile dev network
      { followerId: "user7", followingId: "user1" },
      { followerId: "user7", followingId: "user3" },
      { followerId: "user7", followingId: "user4" },
      { followerId: "user7", followingId: "user9" },

      // Henry follows security folks
      { followerId: "user8", followingId: "user2" },
      { followerId: "user8", followingId: "user5" },
      { followerId: "user8", followingId: "user10" },

      // Iris follows creatives
      { followerId: "user9", followingId: "user3" },
      { followerId: "user9", followingId: "user7" },
      { followerId: "user9", followingId: "user1" },

      // Jack's backend community
      { followerId: "user10", followingId: "user1" },
      { followerId: "user10", followingId: "user2" },
      { followerId: "user10", followingId: "user4" },
      { followerId: "user10", followingId: "user6" },
    ],
  });

  console.log("✅ 40+ Follow relationships created.");

  // 4. CREATE DIVERSE POSTS (20+ posts with variety)
  const posts = [];

  // Alice's posts
  posts.push(
    await prisma.post.create({
      data: {
        userId: "user1",
        desc: "Just deployed the new Prisma schema! The type safety is incredible. #webdev #prisma",
        img: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
        createdAt: new Date(Date.now() - 86400000 * 5),
      },
    }),
  );

  posts.push(
    await prisma.post.create({
      data: {
        userId: "user1",
        desc: "Coffee + Code = Perfect Morning ☕️💻",
        img: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
        createdAt: new Date(Date.now() - 86400000 * 2),
      },
    }),
  );

  // Bob's posts
  posts.push(
    await prisma.post.create({
      data: {
        userId: "user2",
        desc: "Morning views from the new office! London is looking bright today.",
        img: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg",
        createdAt: new Date(Date.now() - 3600000 * 10),
      },
    }),
  );

  posts.push(
    await prisma.post.create({
      data: {
        userId: "user2",
        desc: "Successfully migrated 50+ microservices to Kubernetes. Team effort! 🚀",
        createdAt: new Date(Date.now() - 86400000 * 3),
      },
    }),
  );

  // Charlie's posts
  posts.push(
    await prisma.post.create({
      data: {
        userId: "user3",
        desc: "New design system just dropped! Check out these color palettes 🎨",
        img: "https://images.pexels.com/photos/1936936/pexels-photo-1936936.jpeg",
        createdAt: new Date(Date.now() - 3600000 * 6),
      },
    }),
  );

  posts.push(
    await prisma.post.create({
      data: {
        userId: "user3",
        desc: "Dark mode vs Light mode? The eternal debate continues...",
        createdAt: new Date(Date.now() - 86400000 * 4),
      },
    }),
  );

  // Dave's posts
  posts.push(
    await prisma.post.create({
      data: {
        userId: "user4",
        desc: "Check out this smooth animation I just finished! Thoughts?",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        createdAt: new Date(Date.now() - 3600000 * 2),
      },
    }),
  );

  posts.push(
    await prisma.post.create({
      data: {
        userId: "user4",
        desc: "React 19 features are mind-blowing! Server Components FTW 🎉",
        createdAt: new Date(Date.now() - 86400000),
      },
    }),
  );

  // Emma's posts
  posts.push(
    await prisma.post.create({
      data: {
        userId: "user5",
        desc: "Just closed our Series A! Grateful for the amazing team and investors 🦄",
        img: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
        createdAt: new Date(Date.now() - 86400000 * 7),
      },
    }),
  );

  posts.push(
    await prisma.post.create({
      data: {
        userId: "user5",
        desc: "Startup life: 20% building product, 80% solving problems you didn't know existed 😅",
        createdAt: new Date(Date.now() - 3600000 * 15),
      },
    }),
  );

  // Frank's posts
  posts.push(
    await prisma.post.create({
      data: {
        userId: "user6",
        desc: "Training a new ML model for image recognition. 95% accuracy so far! 🤖",
        img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
        createdAt: new Date(Date.now() - 3600000 * 8),
      },
    }),
  );

  posts.push(
    await prisma.post.create({
      data: {
        userId: "user6",
        desc: "Python is beautiful. TensorFlow is powerful. Together? Magic ✨",
        createdAt: new Date(Date.now() - 86400000 * 6),
      },
    }),
  );

  // Grace's posts
  posts.push(
    await prisma.post.create({
      data: {
        userId: "user7",
        desc: "SwiftUI makes iOS development so much fun! Built this in an afternoon 📱",
        video: "https://www.w3schools.com/html/movie.mp4",
        createdAt: new Date(Date.now() - 3600000 * 4),
      },
    }),
  );

  posts.push(
    await prisma.post.create({
      data: {
        userId: "user7",
        desc: "App Store approval on first try! Never thought I'd see the day 🎊",
        createdAt: new Date(Date.now() - 86400000 * 2),
      },
    }),
  );

  // Henry's posts
  posts.push(
    await prisma.post.create({
      data: {
        userId: "user8",
        desc: "Found a critical vulnerability today. Responsible disclosure saved the day 🔒",
        createdAt: new Date(Date.now() - 3600000 * 12),
      },
    }),
  );

  posts.push(
    await prisma.post.create({
      data: {
        userId: "user8",
        desc: "Remember: Security is not a feature, it's a foundation. Build accordingly.",
        img: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
        createdAt: new Date(Date.now() - 86400000 * 5),
      },
    }),
  );

  // Iris's posts
  posts.push(
    await prisma.post.create({
      data: {
        userId: "user9",
        desc: "Behind the scenes of today's shoot! The magic happens in editing ✨",
        img: "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg",
        createdAt: new Date(Date.now() - 3600000 * 5),
      },
    }),
  );

  posts.push(
    await prisma.post.create({
      data: {
        userId: "user9",
        desc: "Just hit 100K followers! Thank you all for the support 🙏💕",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        createdAt: new Date(Date.now() - 86400000 * 3),
      },
    }),
  );

  // Jack's posts
  posts.push(
    await prisma.post.create({
      data: {
        userId: "user10",
        desc: "Built a REST API that handles 10K requests/sec. Node.js + Redis = 🔥",
        createdAt: new Date(Date.now() - 3600000 * 7),
      },
    }),
  );

  posts.push(
    await prisma.post.create({
      data: {
        userId: "user10",
        desc: "Microservices architecture diagram for our new project. Thoughts?",
        img: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg",
        createdAt: new Date(Date.now() - 86400000 * 4),
      },
    }),
  );

  console.log("✅ 20 diverse posts created.");

  // 5. CREATE REPOSTS (Quote and Simple)
  await prisma.post.create({
    data: {
      userId: "user1",
      rePostId: posts[2].id,
      desc: null,
      createdAt: new Date(Date.now() - 3600000 * 9),
    },
  });

  await prisma.post.create({
    data: {
      userId: "user3",
      rePostId: posts[0].id,
      desc: "This! Prisma has changed my entire workflow 🙌",
      createdAt: new Date(Date.now() - 86400000 * 4),
    },
  });

  await prisma.post.create({
    data: {
      userId: "user5",
      rePostId: posts[10].id,
      desc: "The future of AI is bright! 🚀",
      createdAt: new Date(Date.now() - 3600000 * 6),
    },
  });

  console.log("✅ Reposts created.");

  // 6. CREATE COMMENTS (Nested conversations)
  await prisma.post.createMany({
    data: [
      {
        userId: "user3",
        parentPostId: posts[0].id,
        desc: "Prisma is a game changer for DX!",
      },
      {
        userId: "user2",
        parentPostId: posts[0].id,
        desc: "Agreed. Much better than manual SQL for most things.",
      },
      {
        userId: "user10",
        parentPostId: posts[0].id,
        desc: "How's the performance compared to raw SQL?",
      },
      {
        userId: "user1",
        parentPostId: posts[8].id,
        desc: "Congratulations! Well deserved 🎉",
      },
      {
        userId: "user5",
        parentPostId: posts[8].id,
        desc: "Thanks Alice! Couldn't have done it without supporters like you!",
      },
      {
        userId: "user9",
        parentPostId: posts[4].id,
        desc: "Those colors are stunning! Can I use this palette?",
      },
      {
        userId: "user7",
        parentPostId: posts[4].id,
        desc: "Would love to see this in dark mode!",
      },
      {
        userId: "user4",
        parentPostId: posts[6].id,
        desc: "Smooth as butter! What library did you use?",
      },
      {
        userId: "user6",
        parentPostId: posts[10].id,
        desc: "95% is impressive! What dataset are you using?",
      },
      {
        userId: "user1",
        parentPostId: posts[10].id,
        desc: "ML is the future! Keep pushing 🚀",
      },
    ],
  });

  console.log("✅ Comments and conversations created.");

  // 7. CREATE EXTENSIVE LIKES
  const likeData = [];

  // Post 0 - very popular
  likeData.push(
    { userId: "user2", postId: posts[0].id },
    { userId: "user3", postId: posts[0].id },
    { userId: "user4", postId: posts[0].id },
    { userId: "user6", postId: posts[0].id },
    { userId: "user10", postId: posts[0].id },
  );

  // Post 2 - popular
  likeData.push(
    { userId: "user1", postId: posts[2].id },
    { userId: "user3", postId: posts[2].id },
    { userId: "user5", postId: posts[2].id },
    { userId: "user7", postId: posts[2].id },
  );

  // Post 4 - very popular with creatives
  likeData.push(
    { userId: "user1", postId: posts[4].id },
    { userId: "user7", postId: posts[4].id },
    { userId: "user9", postId: posts[4].id },
    { userId: "user5", postId: posts[4].id },
    { userId: "user4", postId: posts[4].id },
  );

  // Post 6 - tech crowd loves it
  likeData.push(
    { userId: "user1", postId: posts[6].id },
    { userId: "user3", postId: posts[6].id },
    { userId: "user7", postId: posts[6].id },
    { userId: "user10", postId: posts[6].id },
  );

  // Post 8 - everyone celebrates
  likeData.push(
    { userId: "user1", postId: posts[8].id },
    { userId: "user2", postId: posts[8].id },
    { userId: "user3", postId: posts[8].id },
    { userId: "user6", postId: posts[8].id },
    { userId: "user8", postId: posts[8].id },
    { userId: "user9", postId: posts[8].id },
  );

  // Post 10 - AI enthusiasts
  likeData.push(
    { userId: "user1", postId: posts[10].id },
    { userId: "user5", postId: posts[10].id },
    { userId: "user10", postId: posts[10].id },
  );

  // Post 12 - mobile devs
  likeData.push(
    { userId: "user1", postId: posts[12].id },
    { userId: "user4", postId: posts[12].id },
    { userId: "user9", postId: posts[12].id },
  );

  // Post 14 - serious devs
  likeData.push(
    { userId: "user2", postId: posts[14].id },
    { userId: "user5", postId: posts[14].id },
    { userId: "user10", postId: posts[14].id },
  );

  // Post 16 - creatives
  likeData.push(
    { userId: "user3", postId: posts[16].id },
    { userId: "user7", postId: posts[16].id },
    { userId: "user9", postId: posts[16].id },
    { userId: "user1", postId: posts[16].id },
  );

  // Post 18 - backend crowd
  likeData.push(
    { userId: "user1", postId: posts[18].id },
    { userId: "user2", postId: posts[18].id },
    { userId: "user4", postId: posts[18].id },
    { userId: "user6", postId: posts[18].id },
  );

  // Spread some likes on other posts too
  likeData.push(
    { userId: "user5", postId: posts[1].id },
    { userId: "user8", postId: posts[3].id },
    { userId: "user2", postId: posts[5].id },
    { userId: "user6", postId: posts[7].id },
    { userId: "user3", postId: posts[9].id },
    { userId: "user4", postId: posts[11].id },
    { userId: "user8", postId: posts[13].id },
    { userId: "user5", postId: posts[15].id },
    { userId: "user6", postId: posts[17].id },
    { userId: "user7", postId: posts[19].id },
  );

  await prisma.like.createMany({ data: likeData });

  console.log(`✅ ${likeData.length} likes created.`);

  // 8. CREATE SAVED POSTS
  await prisma.savedPosts.createMany({
    data: [
      { userId: "user1", postId: posts[6].id },
      { userId: "user1", postId: posts[10].id },
      { userId: "user3", postId: posts[0].id },
      { userId: "user4", postId: posts[4].id },
      { userId: "user5", postId: posts[18].id },
      { userId: "user6", postId: posts[10].id },
      { userId: "user7", postId: posts[16].id },
      { userId: "user9", postId: posts[4].id },
      { userId: "user10", postId: posts[0].id },
    ],
  });

  console.log("✅ Saved posts created.");

  // Summary
  console.log("\n📊 Database Summary:");
  console.log("==================");
  console.log("👥 Users: 10");
  console.log("🔗 Follow relationships: 40+");
  console.log("📝 Posts: 20+ (original posts)");
  console.log("🔄 Reposts: 3");
  console.log("💬 Comments: 10+");
  console.log(`❤️  Likes: ${likeData.length}`);
  console.log("🔖 Saved Posts: 9");
  console.log("==================");
  console.log("🏁 Database is now rich with realistic social data!");
}

main()
  .catch((e) => {
    console.error("❌ Seed Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
