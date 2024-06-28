import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    await prisma.patient.create({
        data: {
            email: "test@test.com",
            name: "test",
            firstname: "test",
            birthDate: new Date(Date.now()),
            cellphone: "123456789",
            numOperation: '123456789',

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
