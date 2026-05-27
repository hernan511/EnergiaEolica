import { useEffect, useMemo, useState } from 'react' import { Trophy, Users, Lock, Globe, LogOut, Save, Crown } from 'lucide-react'

const partidosIniciales = [ { id: 1, grupo: 'Grupo A', fecha: '2026-06-11 18:00', local: 'Argentina', visitante: 'Brasil', resultado: null }, { id: 2, grupo: 'Grupo B', fecha: '2026-06-12 16:00', local: 'España', visitante: 'Francia', resultado: null }, { id: 3, grupo: 'Grupo C', fecha: '2026-06-13 20:00', local: 'Alemania', visitante: 'Portugal', resultado: null } ]

const tablaMock = [ { nombre: 'Hernán', puntos: 12 }, { nombre: 'Lucas', puntos: 9 }, { nombre: 'Matías', puntos: 7 } ]

export default function ProdeMundial() { const [usuario, setUsuario] = useState('Hernán') const [codigoSala, setCodigoSala] = useState('MUNDIAL2026') const [pronosticos, setPronosticos] = useState({}) const [mensaje, setMensaje] = useState('')

useEffect(() => { const guardados = localStorage.getItem('prode-pronosticos')

if (guardados) {
  setPronosticos(JSON.parse(guardados))
}

}, [])

const guardarPronosticos = () => { localStorage.setItem('prode-pronosticos', JSON.stringify(pronosticos))

setMensaje('Pronósticos guardados correctamente')

setTimeout(() => {
  setMensaje('')
}, 3000)

}

const actualizarPronostico = (partidoId, tipo, valor) => { setPronosticos((prev) => ({ ...prev, [partidoId]: { ...prev[partidoId], [tipo]: valueOrZero(valor) } })) }

const linkSala = useMemo(() => { if (typeof window === 'undefined') return ''

return `${window.location.origin}?sala=${codigoSala}`

}, [codigoSala])

const copiarLink = async () => { try { await navigator.clipboard.writeText(linkSala) setMensaje('Link copiado al portapapeles') } catch { setMensaje('No se pudo copiar el link') } }

return ( <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-sky-950 text-white p-4 md:p-8"> <div className="max-w-6xl mx-auto"> <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6 backdrop-blur-xl shadow-2xl"> <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"> <div> <div className="flex items-center gap-3 mb-3"> <Trophy className="w-10 h-10 text-yellow-400" />

<h1 className="text-4xl md:text-5xl font-black tracking-tight">
              PRODE MUNDIAL
            </h1>
          </div>

          <p className="text-zinc-400 text-lg">
            Creá salas privadas y jugá online con tus amigos
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 transition px-5 py-3 rounded-2xl border border-zinc-700">
            <Users className="w-5 h-5" />
            Sala privada
          </button>

          <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 transition px-5 py-3 rounded-2xl font-bold shadow-lg shadow-sky-500/20">
            <Globe className="w-5 h-5" />
            Online
          </button>
        </div>
      </div>
    </div>

    <div className="grid lg:grid-cols-3 gap-6 mt-6">
      <div className="lg:col-span-2 space-y-5">
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">
                Tus Pronósticos
              </h2>

              <p className="text-zinc-400">
                Los partidos se bloquean automáticamente al comenzar
              </p>
            </div>

            <div className="flex items-center gap-2 bg-zinc-800 rounded-2xl px-4 py-3 border border-zinc-700">
              <Lock className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold">Bloqueo automático</span>
            </div>
          </div>

          <div className="space-y-4">
            {partidosIniciales.map((partido) => {
              const bloqueado = false

              return (
                <div
                  key={partido.id}
                  className="bg-zinc-800/80 border border-zinc-700 rounded-3xl p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div>
                      <span className="text-sm bg-sky-500/20 text-sky-300 px-3 py-1 rounded-full border border-sky-500/20">
                        {partido.grupo}
                      </span>
                    </div>

                    <span className="text-zinc-400 text-sm">
                      {partido.fecha}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
                    <div className="text-center md:text-right text-2xl font-bold">
                      {partido.local}
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      <input
                        type="number"
                        min="0"
                        disabled={bloqueado}
                        value={pronosticos?.[partido.id]?.local || ''}
                        onChange={(e) =>
                          actualizarPronostico(partido.id, 'local', e.target.value)
                        }
                        className="w-20 h-16 rounded-2xl bg-zinc-700 border border-zinc-600 text-center text-2xl font-bold outline-none focus:border-sky-400"
                      />

                      <span className="text-3xl font-black text-zinc-500">
                        -
                      </span>

                      <input
                        type="number"
                        min="0"
                        disabled={bloqueado}
                        value={pronosticos?.[partido.id]?.visitante || ''}
                        onChange={(e) =>
                          actualizarPronostico(partido.id, 'visitante', e.target.value)
                        }
                        className="w-20 h-16 rounded-2xl bg-zinc-700 border border-zinc-600 text-center text-2xl font-bold outline-none focus:border-sky-400"
                      />
                    </div>

                    <div className="text-center md:text-left text-2xl font-bold">
                      {partido.visitante}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <button
            onClick={guardarPronosticos}
            className="w-full mt-6 h-16 rounded-2xl bg-sky-500 hover:bg-sky-400 transition text-xl font-black shadow-xl shadow-sky-500/20 flex items-center justify-center gap-3"
          >
            <Save className="w-6 h-6" />
            Guardar Pronósticos
          </button>

          {mensaje && (
            <div className="mt-4 bg-green-500/20 border border-green-500/30 text-green-300 rounded-2xl p-4 text-center font-semibold">
              {mensaje}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-5">
            <Crown className="w-7 h-7 text-yellow-400" />
            <h2 className="text-2xl font-bold">
              Tabla de Posiciones
            </h2>
          </div>

          <div className="space-y-3">
            {tablaMock.map((jugador, index) => (
              <div
                key={jugador.nombre}
                className="flex items-center justify-between bg-zinc-800 rounded-2xl p-4 border border-zinc-700"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center font-black">
                    {index + 1}
                  </div>

                  <span className="font-bold text-lg">
                    {jugador.nombre}
                  </span>
                </div>

                <span className="font-black text-xl text-yellow-400">
                  {jugador.puntos}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6 backdrop-blur-xl">
          <h2 className="text-2xl font-bold mb-4">
            Sala Privada
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-zinc-400 text-sm block mb-2">
                Código de Sala
              </label>

              <input
                value={codigoSala}
                onChange={(e) => setCodigoSala(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl h-14 px-4 outline-none focus:border-sky-400 font-bold"
              />
            </div>

            <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 break-all text-sm text-zinc-300">
              {linkSala || 'Tu link aparecerá acá'}
            </div>

            <button
              onClick={copiarLink}
              className="w-full h-14 rounded-2xl bg-zinc-800 hover:bg-zinc-700 transition border border-zinc-700 font-bold"
            >
              Copiar Link de Invitación
            </button>
          </div>
        </div>

        <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6 backdrop-blur-xl">
          <h2 className="text-2xl font-bold mb-4">
            Funciones para agregar
          </h2>

          <div className="space-y-3 text-zinc-300">
            <div className="bg-zinc-800 rounded-2xl p-4 border border-zinc-700">
              Login con Google
            </div>

            <div className="bg-zinc-800 rounded-2xl p-4 border border-zinc-700">
              Firebase / Supabase
            </div>

            <div className="bg-zinc-800 rounded-2xl p-4 border border-zinc-700">
              Puntos automáticos
            </div>

            <div className="bg-zinc-800 rounded-2xl p-4 border border-zinc-700">
              Ranking en vivo
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-6 bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Cómo subirlo online
          </h2>

          <p className="text-zinc-400">
            Subilo a GitHub y conectalo con Vercel para tenerlo gratis online.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="bg-zinc-800 hover:bg-zinc-700 transition rounded-2xl px-5 py-3 border border-zinc-700 font-bold">
            GitHub
          </button>

          <button className="bg-sky-500 hover:bg-sky-400 transition rounded-2xl px-5 py-3 font-black shadow-lg shadow-sky-500/20">
            Deploy Vercel
          </button>

          <button className="bg-red-500/20 hover:bg-red-500/30 transition rounded-2xl px-5 py-3 border border-red-500/30 text-red-300 font-bold flex items-center gap-2">
            <LogOut className="w-5 h-5" />
            Salir
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

) }

function valueOrZero(value) { if (value === '') return ''

return Number(value) }
