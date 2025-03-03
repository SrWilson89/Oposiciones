import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Building, MapPin, Calendar, Filter, Loader2 } from 'lucide-react';

interface Oposicion {
  id: number;
  titulo: string;
  organismo: string;
  ubicacion: string;
  fechaPublicacion: string;
  plazas: number;
  categoria: string;
  estado: 'Abierta' | 'Cerrada' | 'Próximamente';
  url: string;
}

function App() {
  const [oposiciones, setOposiciones] = useState<Oposicion[]>([]);
  const [filteredOposiciones, setFilteredOposiciones] = useState<Oposicion[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoria, setCategoria] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [loading, setLoading] = useState(true);

  // Simulated data fetch - in a real app, this would be an API call
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      const mockData: Oposicion[] = [
        {
          id: 1,
          titulo: 'Auxiliar Administrativo',
          organismo: 'Ministerio de Hacienda',
          ubicacion: 'Madrid',
          fechaPublicacion: '2025-01-15',
          plazas: 120,
          categoria: 'Administración General',
          estado: 'Abierta',
          url: 'https://administracion.gob.es/ejemplo1'
        },
        {
          id: 2,
          titulo: 'Técnico Superior de Gestión',
          organismo: 'Junta de Andalucía',
          ubicacion: 'Sevilla',
          fechaPublicacion: '2025-02-10',
          plazas: 45,
          categoria: 'Administración General',
          estado: 'Abierta',
          url: 'https://juntadeandalucia.es/ejemplo2'
        },
        {
          id: 3,
          titulo: 'Profesor de Secundaria - Matemáticas',
          organismo: 'Consejería de Educación de Cataluña',
          ubicacion: 'Barcelona',
          fechaPublicacion: '2025-03-01',
          plazas: 80,
          categoria: 'Educación',
          estado: 'Próximamente',
          url: 'https://educacio.gencat.cat/ejemplo3'
        },
        {
          id: 4,
          titulo: 'Enfermero/a',
          organismo: 'Servicio Vasco de Salud',
          ubicacion: 'Bilbao',
          fechaPublicacion: '2025-01-20',
          plazas: 200,
          categoria: 'Sanidad',
          estado: 'Abierta',
          url: 'https://osakidetza.euskadi.eus/ejemplo4'
        },
        {
          id: 5,
          titulo: 'Agente de Policía Local',
          organismo: 'Ayuntamiento de Valencia',
          ubicacion: 'Valencia',
          fechaPublicacion: '2025-02-15',
          plazas: 30,
          categoria: 'Seguridad',
          estado: 'Cerrada',
          url: 'https://valencia.es/ejemplo5'
        },
        {
          id: 6,
          titulo: 'Técnico de Biblioteca',
          organismo: 'Diputación de Zaragoza',
          ubicacion: 'Zaragoza',
          fechaPublicacion: '2025-03-10',
          plazas: 15,
          categoria: 'Cultura',
          estado: 'Próximamente',
          url: 'https://dpz.es/ejemplo6'
        },
        {
          id: 7,
          titulo: 'Administrativo',
          organismo: 'Xunta de Galicia',
          ubicacion: 'Santiago de Compostela',
          fechaPublicacion: '2025-01-25',
          plazas: 50,
          categoria: 'Administración General',
          estado: 'Abierta',
          url: 'https://xunta.gal/ejemplo7'
        },
        {
          id: 8,
          titulo: 'Bombero',
          organismo: 'Cabildo de Gran Canaria',
          ubicacion: 'Las Palmas',
          fechaPublicacion: '2025-02-20',
          plazas: 25,
          categoria: 'Seguridad',
          estado: 'Abierta',
          url: 'https://grancanaria.com/ejemplo8'
        }
      ];
      
      setOposiciones(mockData);
      setFilteredOposiciones(mockData);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter oposiciones based on search term and filters
  useEffect(() => {
    let results = oposiciones;
    
    if (searchTerm) {
      results = results.filter(
        oposicion => 
          oposicion.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          oposicion.organismo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoria) {
      results = results.filter(oposicion => oposicion.categoria === categoria);
    }
    
    if (ubicacion) {
      results = results.filter(oposicion => oposicion.ubicacion === ubicacion);
    }
    
    setFilteredOposiciones(results);
  }, [searchTerm, categoria, ubicacion, oposiciones]);

  // Get unique categories and locations for filters
  const categorias = [...new Set(oposiciones.map(o => o.categoria))];
  const ubicaciones = [...new Set(oposiciones.map(o => o.ubicacion))];

  // Format date to Spanish format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Status badge color
  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'Abierta':
        return 'bg-green-100 text-green-800';
      case 'Cerrada':
        return 'bg-red-100 text-red-800';
      case 'Próximamente':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <BookOpen className="h-8 w-8 mr-2" />
              <h1 className="text-2xl font-bold">Buscador de Oposiciones</h1>
            </div>
            <p className="text-blue-100">Encuentra tu oportunidad en el sector público español</p>
          </div>
        </div>
      </header>

      {/* Search and filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search input */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Buscar por título o organismo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category filter */}
            <div className="w-full md:w-64">
              <div className="relative">
                <select
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="">Todas las categorías</option>
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Location filter */}
            <div className="w-full md:w-64">
              <div className="relative">
                <select
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                >
                  <option value="">Todas las ubicaciones</option>
                  {ubicaciones.map((ubi) => (
                    <option key={ubi} value={ubi}>{ubi}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-medium text-gray-900">
              Resultados ({filteredOposiciones.length})
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
              <span className="ml-2 text-gray-600">Cargando oposiciones...</span>
            </div>
          ) : filteredOposiciones.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No se encontraron oposiciones con los criterios seleccionados.</p>
              <button 
                className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                onClick={() => {
                  setSearchTerm('');
                  setCategoria('');
                  setUbicacion('');
                }}
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredOposiciones.map((oposicion) => (
                <li key={oposicion.id} className="hover:bg-gray-50">
                  <div className="px-6 py-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-blue-600">{oposicion.titulo}</h3>
                          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(oposicion.estado)}`}>
                            {oposicion.estado}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <Building className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <span>{oposicion.organismo}</span>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <span>{oposicion.ubicacion}</span>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <span>Publicado: {formatDate(oposicion.fechaPublicacion)}</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {oposicion.plazas} plazas
                        </span>
                        <span className="mt-1 text-sm text-gray-500">{oposicion.categoria}</span>
                        <a
                          href={oposicion.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Ver convocatoria
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <BookOpen className="h-6 w-6 mr-2" />
                <span className="text-xl font-bold">Buscador de Oposiciones</span>
              </div>
              <p className="mt-2 text-gray-400 text-sm">
                Encuentra todas las oposiciones disponibles en España
              </p>
            </div>
            <div className="text-gray-400 text-sm">
              <p>© 2025 Buscador de Oposiciones</p>
              <p>Esta es una aplicación de demostración</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;