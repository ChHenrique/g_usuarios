export function objectToFormData(obj: Record<string, any>): FormData {
  const formData = new FormData();

  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) {
      formData.append(key, obj[key]);
    }
  }

  return formData;
}
