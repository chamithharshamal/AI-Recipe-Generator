function ImageUpload() {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Upload Ingredient Image (Coming Soon)</h2>
      <input
        type="file"
        accept="image/*"
        disabled
        className="w-full p-2 border rounded bg-gray-200 cursor-not-allowed"
      />
      <p className="text-sm text-gray-500">Image recognition will be added soon!</p>
    </div>
  );
}

export default ImageUpload;