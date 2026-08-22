const url = process.env.VERIFY_URL ?? "https://vetlinenutrition.vercel.app/";

try {
  const res = await fetch(url, { method: "GET" });
  const encoding = res.headers.get("content-encoding") ?? "(sin compresión)";
  const length = Number(res.headers.get("content-length") ?? 0);

  console.log(`URL:      ${url}`);
  console.log(`Status:   ${res.status}`);
  console.log(`Encoding: ${encoding}`);

  if (!res.ok) {
    console.error("✗ El deploy no responde correctamente");
    process.exit(1);
  }
  if (!/(br|gzip)/.test(encoding)) {
    console.error("✗ El hosting NO está comprimiendo (se esperaba br o gzip)");
    process.exit(1);
  }
  if (length > 0) {
    console.log(`Tamaño HTML transferido: ${(length / 1024).toFixed(1)} KB`);
  }
  console.log("✓ Compresión del hosting verificada");
} catch (err) {
  console.error(`✗ No se pudo verificar el deploy: ${err.message}`);
  process.exit(1);
}
