function ErrorMessage({ message }) {
  return (
    <div className="bg-red-600/20 border border-red-600 text-red-400 p-4 rounded-lg my-4">
      {message}
    </div>
  );
}

export default ErrorMessage;