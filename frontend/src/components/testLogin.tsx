
export default function GoogleLogin() {
  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth route
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-6">Sign in</h1>

        <button
          onClick={handleGoogleLogin}
          className="w-full p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
