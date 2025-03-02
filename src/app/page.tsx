import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-800">Catering Elite</h1>
          <Link 
            href="/auth/signin" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md transition duration-300 shadow-md"
          >
            Iniciar Sesión
          </Link>
        </div>
      </header>
      
      <main className="flex-grow">
        <section className="relative py-32 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Gestión Profesional para Servicios de Catering
            </h2>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light opacity-90">
              Optimiza tus operaciones, controla tu inventario y organiza tus eventos con precisión y elegancia
            </p>
            <Link 
              href="/auth/signin" 
              className="bg-white text-indigo-900 hover:bg-gray-100 font-bold py-4 px-10 rounded-lg text-lg transition duration-300 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Acceder al Sistema
            </Link>
          </div>
        </section>
        
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">Soluciones Profesionales para tu Negocio</h2>
            
            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">Gestión de Inventario</h3>
                <p className="text-gray-600 text-center">
                  Control preciso de tu inventario con categorización, seguimiento en tiempo real y alertas de stock.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">Planificación de Eventos</h3>
                <p className="text-gray-600 text-center">
                  Organiza eventos con facilidad, asignando recursos y generando documentación profesional.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition duration-300 inline-block shadow-md"
              >
                Comenzar Ahora
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold mb-4">Catering Elite</h3>
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
