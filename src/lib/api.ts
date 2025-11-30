export async function sendLoanApplication(data: any) {
  const response = await fetch('http://localhost:3001/api/sendLoanApplication', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function testapi() {
  const response = await fetch('http://localhost:3001/api/test', {
    method: "GET",
  });

  return response.json();
}
