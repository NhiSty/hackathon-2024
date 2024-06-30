export async function kpi() {
    const response = await fetch(`http://localhost:8000/api/v1/kpi`);
  
    if (!response.ok) {
      return Promise.reject(response);
    }
  
    return response.json();
  }