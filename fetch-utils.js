const SUPABASE_URL = 'https://hnwrqbuafnmeqngyhxku.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhud3JxYnVhZm5tZXFuZ3loeGt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ5OTYwNjYsImV4cCI6MTk4MDU3MjA2Nn0.y8u3fp6hVDf8D1THV6tqYwhbuLfea8LVEIUUrcF4qhY';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
export async function createPost(post) {
    return await client.from('posts').insert(post);
}

export async function uploadImage(bucketName, imagePath, imageFile) {
    const bucket = client.storage.from(bucketName);
    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
    });
    if (response.error) {
        return null;
    }
    // Construct the URL to this image:
    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;
    return url;
}

export async function getPosts() {
    return await client.from('posts').select('*');
}

export async function getPost(id) {
    return await client
        .from('posts')
        .select('*, comments(*)')
        .eq('id', id)
        .order('created_at', { foreignTable: 'comments', ascending: false })
        .single();
}

export async function createComment(comment) {
    return await client.from('comments').insert(comment).single();
}
