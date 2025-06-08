import { useState, ChangeEvent, FormEvent } from 'react';
import { createUser } from '../services/userService';
import type { User } from '../types';

export default function CreateUserPage() {
  const [formData, setFormData] = useState<Omit<User, 'id' | 'imageUrl'> & { imageUrl: File | null }>({
    name: '',
    email: '',
    password: '',
    imageUrl: null,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;

    if (name === 'imageUrl' && files && files[0]) {
      setFormData(prev => ({ ...prev, imageUrl: files[0] }));
      setPreviewUrl(URL.createObjectURL(files[0]));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userToCreate: User = {
        id: '',
        name: formData.name,
        email: formData.email,
        password: formData.password,
        imageUrl: formData.imageUrl as any,
      };

      await createUser(userToCreate);
      alert('Usuário criado com sucesso!');

      setFormData({
        name: '',
        email: '',
        password: '',
        imageUrl: null,
      });
      setPreviewUrl(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">
      <main className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">
          Criar Usuário
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">

          {/* Nome */}
          <label className="flex flex-col">
            <span className="mb-2 font-semibold text-gray-700">👤 Nome</span>
            <input
              type="text"
              name="name"
              placeholder="Seu nome completo"
              value={formData.name}
              onChange={handleChange}
              required
              className="px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
            />
          </label>

          {/* Email */}
          <label className="flex flex-col">
            <span className="mb-2 font-semibold text-gray-700">📧 Email</span>
            <input
              type="email"
              name="email"
              placeholder="seuemail@exemplo.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
            />
          </label>

          {/* Senha */}
          <label className="flex flex-col">
            <span className="mb-2 font-semibold text-gray-700">🔒 Senha</span>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
              className="px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
            />
          </label>

          {/* Imagem */}
          <label className="flex flex-col cursor-pointer">
            <span className="mb-2 font-semibold text-gray-700">🖼️ Foto do Perfil (opcional)</span>
            <input
              type="file"
              name="imageUrl"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="imageInput"
            />
            <div
              onClick={() => document.getElementById('imageInput')?.click()}
              className="flex items-center justify-center border border-gray-300 rounded-lg px-5 py-3 text-gray-600 hover:bg-indigo-50 hover:border-indigo-400 transition cursor-pointer select-none"
            >
              {formData.imageUrl ? formData.imageUrl.name : 'Clique para selecionar uma imagem'}
            </div>
          </label>

          {/* Preview da imagem */}
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview da imagem"
              className="rounded-lg shadow-md object-cover w-32 h-32 mx-auto"
            />
          )}

          {error && (
            <p className="text-red-600 font-semibold text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white font-bold py-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Criando...' : 'Criar Usuário'}
          </button>
        </form>
      </main>
    </div>
  );
}
