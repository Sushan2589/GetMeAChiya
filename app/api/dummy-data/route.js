// app/api/dummy-data/route.js

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const method = searchParams.get("method");

  if (method === "esewa") {
    return Response.json({
      amount: "100",
      productName: "Test Product",
      transactionId: "TXN123456",
    });
  }

  return Response.json({ error: "Invalid method" }, { status: 400 });
}
