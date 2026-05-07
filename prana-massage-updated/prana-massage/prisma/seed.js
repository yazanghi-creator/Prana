import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.service.deleteMany();
  await prisma.admin.deleteMany();

  // Create services based on Prana Massage offerings
  const services = await Promise.all([
    prisma.service.create({
      data: {
        name: "Gentle massage",
        nameDe: "Sanfte Massage",
        description:
          "A gentle, soothing massage designed to relieve stress and promote deep relaxation. Perfect for unwinding after a long week.",
        descriptionDe:
          "Eine sanfte, wohltuende Massage zur Stresslinderung und tiefen Entspannung. Perfekt zum Abschalten nach einer langen Woche.",
        duration: 60,
        price: 59.0,
      },
    }),
    prisma.service.create({
      data: {
        name: "Painless massage",
        nameDe: "Schmerzfreie Massage",
        description:
          "A therapeutic massage technique designed to provide relief without discomfort. Ideal for those sensitive to pressure.",
        descriptionDe:
          "Eine therapeutische Massagetechnik, die Linderung ohne Beschwerden bietet. Ideal für Menschen, die empfindlich auf Druck reagieren.",
        duration: 60,
        price: 75.0,
      },
    }),
    prisma.service.create({
      data: {
        name: "Cupping - Vacuum pumps - Hacamat - حجامة",
        nameDe: "Schröpfen - Vakuumpumpen - Hacamat - حجامة",
        description:
          "Traditional cupping therapy using vacuum pumps to increase blood flow and promote healing. An ancient practice for modern wellness.",
        descriptionDe:
          "Traditionelle Schröpftherapie mit Vakuumpumpen zur Steigerung der Durchblutung und Förderung der Heilung. Eine alte Praxis für modernes Wohlbefinden.",
        duration: 60,
        price: 75.0,
      },
    }),
    prisma.service.create({
      data: {
        name: "Sports and intense massage",
        nameDe: "Sport- und Intensivmassage",
        description:
          "Designed for active individuals, this intense massage helps prevent injuries, improve flexibility, and speed up recovery.",
        descriptionDe:
          "Speziell für aktive Menschen entwickelt. Diese intensive Massage hilft Verletzungen vorzubeugen, die Flexibilität zu verbessern und die Regeneration zu beschleunigen.",
        duration: 60,
        price: 95.0,
      },
    }),
    prisma.service.create({
      data: {
        name: "Hot Stone Massage",
        nameDe: "Hot-Stone-Massage",
        description:
          "Warm basalt stones combined with massage techniques to melt away tension. The heat penetrates deep into muscles for ultimate relaxation.",
        descriptionDe:
          "Warme Basaltsteine kombiniert mit Massagetechniken lassen Verspannungen schmelzen. Die Wärme dringt tief in die Muskeln ein für ultimative Entspannung.",
        duration: 60,
        price: 75.0,
      },
    }),
    prisma.service.create({
      data: {
        name: "Aura and Chakra Cleansing and Energy Replenishment",
        nameDe: "Aura- und Chakra-Reinigung und Energieauffüllung",
        description:
          "A holistic energy healing session that cleanses your aura and balances your chakras, leaving you feeling refreshed and energized.",
        descriptionDe:
          "Eine ganzheitliche Energieheilungssitzung, die Ihre Aura reinigt und Ihre Chakren ausgleicht, sodass Sie sich erfrischt und energiegeladen fühlen.",
        duration: 60,
        price: 75.0,
      },
    }),
    prisma.service.create({
      data: {
        name: "Pain-free massage - 30 min",
        nameDe: "Schmerzfreie Massage - 30 Min",
        description:
          "A shorter version of our pain-free massage, perfect for quick relief and relaxation during a busy day.",
        descriptionDe:
          "Eine kürzere Version unserer schmerzfreien Massage, perfekt für schnelle Linderung und Entspannung an einem geschäftigen Tag.",
        duration: 30,
        price: 50.0,
      },
    }),
    prisma.service.create({
      data: {
        name: "Gentle massage with warm oils - 30 min",
        nameDe: "Sanfte Massage mit warmen Ölen - 30 Min",
        description:
          "A luxurious short massage using warm aromatic oils to soothe muscles and calm the mind.",
        descriptionDe:
          "Eine luxuriöse Kurzmassage mit warmen aromatischen Ölen zur Entspannung der Muskeln und Beruhigung des Geistes.",
        duration: 30,
        price: 38.0,
      },
    }),
    prisma.service.create({
      data: {
        name: "Gentle massage with warm oils - 90 min",
        nameDe: "Sanfte Massage mit warmen Ölen - 90 Min",
        description:
          "Our extended warm oil massage providing deep relaxation and thorough muscle tension relief over 90 minutes.",
        descriptionDe:
          "Unsere erweiterte Warmölmassage für tiefe Entspannung und gründliche Lösung von Muskelverspannungen über 90 Minuten.",
        duration: 90,
        price: 125.0,
      },
    }),
    prisma.service.create({
      data: {
        name: "Foot reflexology massage - 60 min",
        nameDe: "Fußreflexzonenmassage - 60 Min",
        description:
          "A specialized massage focusing on pressure points in the feet to promote healing throughout the body.",
        descriptionDe:
          "Eine spezialisierte Massage, die sich auf Druckpunkte an den Füßen konzentriert, um die Heilung im ganzen Körper zu fördern.",
        duration: 60,
        price: 75.0,
      },
    }),
    prisma.service.create({
      data: {
        name: "Intensive sports massage - 30 min",
        nameDe: "Intensive Sportmassage - 30 Min",
        description:
          "A focused, intensive massage session targeting specific muscle groups for athletes and active individuals.",
        descriptionDe:
          "Eine fokussierte, intensive Massagesitzung, die auf bestimmte Muskelgruppen für Sportler und aktive Menschen abzielt.",
        duration: 30,
        price: 50.0,
      },
    }),
  ]);

  console.log(
    "Created services:",
    services.map((s) => s.name),
  );
  console.log(
    "\n✨ Time slots are now generated dynamically - no need to seed them!",
  );

  // Create default admin user
  const hashedPassword = await bcrypt.hash("pranaway7$$", 12);
  const admin = await prisma.admin.create({
    data: {
      email: "pranaway7@gmail.com",
      password: hashedPassword,
      name: "Admin",
    },
  });
  console.log("\n👤 Created admin user:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
