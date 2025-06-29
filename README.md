![image](https://github.com/user-attachments/assets/d224210f-725a-4eaa-89ee-3f1b50b284e0)# 📚 Readora

> A modern, SEO-optimized blog platform built with Next.js for seamless content management and sharing.

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

</div>

## 🖼️ Screenshots

<div align="center">
  <img src="https://github.com/user-attachments/assets/9049b7e6-b011-414f-a7e4-0cc42b795d12" alt="Homepage Screenshot" width="800"/>
  <p><em>Clean and modern homepage design</em></p>
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/6e6236f4-abdc-4172-9c73-d09f9bcec1da" alt="Admin Panel Screenshot" width="800"/>
  <p><em>Intuitive admin panel with React-Quill editor</em></p>
</div>

## ✨ Features

### 🌟 **For Readers**
- **Clean Reading Experience** - Distraction-free interface for optimal content consumption
- **SEO-Friendly URLs** - Each post has a unique, shareable slug for better discoverability
- **Responsive Design** - Perfect reading experience across all devices
- **Fast Loading** - Optimized performance with Next.js server-side rendering

### 🔐 **For Administrators**
- **Secure Admin Panel** - JWT-based cookie authentication for enhanced security
- **Rich Text Editor** - Powered by React-Quill for professional content creation
- **Complete CRUD Operations** - Create, Read, Update, and Delete posts with ease
- **Content Security** - Input sanitization to prevent XSS attacks
- **SEO Management** - Automatic meta tags injection for each post

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js** | Full-stack React framework for SSR and routing |
| **React** | Frontend library for building user interfaces |
| **JavaScript** | Core programming language |
| **React-Quill** | Rich text editor for content creation |
| **JWT** | Secure token-based authentication |
| **Cookie-based Auth** | Persistent admin sessions |

## 🛡️ Security Features

- **JWT Authentication** - Secure admin access with token-based authentication
- **Input Sanitization** - Protection against XSS attacks in rich text content
- **Admin-Only CRUD** - Restricted content management access
- **Secure Cookie Storage** - HTTPOnly cookies for token storage

## 🎯 SEO Optimization

- **Dynamic Meta Tags** - Automatic SEO tags injection for each post
- **Slug-based URLs** - Clean, descriptive URLs for better search rankings
- **Server-Side Rendering** - Improved crawlability and page load times
- **Structured Content** - Semantic HTML for better search engine understanding

## 📁 Project Structure

```
my-app/
├── components/          # Reusable React components
├── app/                 # Next.js pages and API routes
├── utils/               # Utility functions 
├── models/              # DB schema files
└── helper/              # Commonly used functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SwastikIIIT/Readora.git
   cd Readora/my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Configure your environment variables in `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to see the application

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
JWT_SECRET=your_jwt_secret_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
# Add other configuration variables
```

## 📖 Usage

### For Readers
1. Visit the homepage to browse all published posts
2. Click on any post to read the full content
3. Share posts using the SEO-friendly URLs

### For Administrators
1. Navigate to `/admin/login` to access the admin panel
2. Use your credentials to log in securely
3. Create, edit, or delete posts using the rich text editor
4. SEO tags are automatically generated for each post

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Swastik**
- GitHub: [@SwastikIIIT](https://github.com/SwastikIIIT)

## 🙏 Acknowledgments

- React-Quill for the excellent rich text editor
- Next.js team for the amazing framework
- All contributors who help improve this project

---

<p align="center">
  <strong>⭐ Star this repository if you found it helpful!</strong>
</p>

<p align="center">
  Made with ❤️ by <a href="https://github.com/SwastikIIIT">Swastik</a>
</p>
