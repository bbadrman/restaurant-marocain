import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });
    }

    // Convertir le fichier en buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Dossier de destination dans /public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // S'assurer que le dossier existe
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Nom unique du fichier
    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, filename);

    // Écriture du fichier
    fs.writeFileSync(filePath, buffer);

    // URL publique
    const publicUrl = `/uploads/${filename}`;
    console.log("✅ Fichier uploadé :", publicUrl);

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error("Erreur upload:", error);
    return NextResponse.json({ error: "Erreur lors de l’upload" }, { status: 500 });
  }
}
