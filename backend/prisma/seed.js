import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    await prisma.patient.create({
        data: {
            email: "test@test.com",
            password: "test",
            name: "test",
        },
    })

}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
