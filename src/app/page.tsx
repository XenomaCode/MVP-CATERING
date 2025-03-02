import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <h1 className="text-2xl font-bold text-teal-800 ml-2">Catering Elite</h1>
          </div>
          <Link 
            href="/auth/signin" 
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-md transition duration-300 shadow-md flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 01-1 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Iniciar Sesión
          </Link>
        </div>
      </header>
      
      <main className="flex-grow">
        <section className="relative py-32 bg-gradient-to-br from-teal-800 via-emerald-700 to-teal-600 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#ffffff" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center justify-center p-2 bg-white bg-opacity-20 rounded-full mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Gestión Profesional para Servicios de Catering
            </h2>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light opacity-90">
              Optimiza tus operaciones, controla tu inventario y organiza tus eventos con precisión y elegancia
            </p>
            <Link 
              href="/auth/signin" 
              className="bg-white text-teal-800 hover:bg-gray-100 font-bold py-4 px-10 rounded-lg text-lg transition duration-300 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 01-1 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Acceder al Sistema
            </Link>
          </div>
        </section>
        
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">Soluciones Profesionales para tu Negocio</h2>
            
            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                    <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">Gestión de Inventario</h3>
                <p className="text-gray-600 text-center">
                  Controla tu stock con precisión, evita pérdidas y optimiza tus recursos en todo momento.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">Planificación de Eventos</h3>
                <p className="text-gray-600 text-center">
                  Organiza eventos con facilidad, asignando recursos y generando documentación profesional.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">Reportes Detallados</h3>
                <p className="text-gray-600 text-center">
                  Análisis completos y exportación de informes para optimizar tu operación y tomar decisiones estratégicas.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">¿Listo para elevar tu servicio de catering?</h2>
              <p className="text-xl text-gray-600 mb-10">
                Únete a los profesionales que ya optimizan su negocio con nuestra plataforma
              </p>
              <Link 
                href="/auth/signin" 
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition duration-300 inline-flex items-center shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Comenzar Ahora
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <h3 className="text-xl font-semibold ml-2">Catering Elite</h3>
          </div>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Solución profesional para la gestión integral de servicios de catering y eventos
          </p>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Catering Elite. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
