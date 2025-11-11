const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

export async function fetchBlogs() {
  const response = await fetch(`${BACKEND_URL}/api/blogs`);
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return response.json();
}

export async function fetchBlogBySlug(slug: string) {
  const response = await fetch(`${BACKEND_URL}/api/blogs/${slug}`);
  if (!response.ok) {
    throw new Error('Failed to fetch blog');
  }
  return response.json();
}

export async function createBlog(data: any) {
  const response = await fetch(`${BACKEND_URL}/api/admin/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create blog');
  }
  return response.json();
}

export async function updateBlog(id: string, data: any) {
  const response = await fetch(`${BACKEND_URL}/api/admin/blogs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update blog');
  }
  return response.json();
}

export async function deleteBlog(id: string) {
  const response = await fetch(`${BACKEND_URL}/api/admin/blogs/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete blog');
  }
  return response.json();
}

export async function fetchAllBlogs() {
  const response = await fetch(`${BACKEND_URL}/api/admin/blogs`);
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return response.json();
}
