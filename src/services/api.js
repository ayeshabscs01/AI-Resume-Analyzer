import axios from 'axios'

/**
 * Sends a resume file and optional job role for analysis.
 */
export async function analyzeResume(file, jobRole = '') {
  // Read custom configurations from localStorage if set by the user
  const endpoint = localStorage.getItem('resu_api_endpoint') || ''
  const customApiKey = localStorage.getItem('resu_openai_key') || ''
  
  // Build target URL
  const baseUrl = endpoint.replace(/\/$/, '') // Strip trailing slash
  const url = `${baseUrl}/api/analyze`

  const formData = new FormData()
  formData.append('file', file)
  if (jobRole) {
    formData.append('job_role', jobRole)
  }

  const headers = {
    'Content-Type': 'multipart/form-data',
  }

  if (customApiKey) {
    headers['X-OpenAI-Key'] = customApiKey
  }

  const response = await axios.post(url, formData, { headers })
  return response.data
}

/**
 * Checks backend API health.
 */
export async function checkApiHealth() {
  const endpoint = localStorage.getItem('resu_api_endpoint') || ''
  const baseUrl = endpoint.replace(/\/$/, '')
  const url = `${baseUrl}/api/health`

  const response = await axios.get(url)
  return response.data
}
