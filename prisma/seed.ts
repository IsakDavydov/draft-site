import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample users
  const user1 = await prisma.user.upsert({
    where: { email: 'admin@footballsite.com' },
    update: {},
    create: {
      email: 'admin@footballsite.com',
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user@footballsite.com' },
    update: {},
    create: {
      email: 'user@footballsite.com',
      name: 'Regular User',
      role: 'USER',
    },
  });

  console.log('✅ Users created');

  // Create sample favorites
  await prisma.favorite.upsert({
    where: { 
      userId_type_targetId: {
        userId: user2.id,
        type: 'team',
        targetId: 'chiefs'
      }
    },
    update: {},
    create: {
      userId: user2.id,
      type: 'team',
      targetId: 'chiefs',
    },
  });

  console.log('✅ Favorites created');

  // Create sample picks
  await prisma.pick.upsert({
    where: { id: 'sample-pick-1' },
    update: {},
    create: {
      id: 'sample-pick-1',
      userId: user2.id,
      week: 1,
      season: 2024,
      gameId: 'game-1',
      pick: 'home',
      confidence: 4,
      units: 2,
      result: 'WIN',
    },
  });

  console.log('✅ Picks created');

  // Create sample pick records
  await prisma.pickRecord.upsert({
    where: { 
      userId_week_season: {
        userId: user2.id,
        week: 1,
        season: 2024
      }
    },
    update: {},
    create: {
      userId: user2.id,
      week: 1,
      season: 2024,
      wins: 2,
      losses: 1,
      pushes: 0,
      units: 3,
      roi: 33.33,
    },
  });

  console.log('✅ Pick records created');

  // Create sample view logs
  await prisma.viewLog.create({
    data: {
      userId: user2.id,
      page: '/season',
      timestamp: new Date(),
    },
  });

  console.log('✅ View logs created');

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
