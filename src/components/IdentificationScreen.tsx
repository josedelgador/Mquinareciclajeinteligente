import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CreditCard, QrCode, CheckCircle2 } from 'lucide-react';

interface IdentificationScreenProps {
  onIdentified: (userId: string) => void;
  onBack: () => void;
}

export function IdentificationScreen({ onIdentified, onBack }: IdentificationScreenProps) {
  const [method, setMethod] = useState<'dni' | 'qr' | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = (scanMethod: 'dni' | 'qr') => {
    setMethod(scanMethod);
    setIsScanning(true);

    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setTimeout(() => {
        const userId = scanMethod === 'dni' ? 'DNI-12345678' : 'QR-USER-789';
        onIdentified(userId);
      }, 500);
    }, 2000);
  };

  const handleCancel = () => {
    setIsScanning(false);
    setMethod(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col p-8"
    >
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg">Volver</span>
        </button>
        
        <h2 className="text-white text-center mb-2">
          Identificación
        </h2>
        <p className="text-slate-400 text-center">
          Selecciona tu método de identificación
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center">
        {!method && !isScanning && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-6"
          >
            {/* DNI Option */}
            <button
              onClick={() => handleScan('dni')}
              className="w-full bg-slate-800/80 hover:bg-slate-700/80 p-8 rounded-2xl transition-all duration-300 border-2 border-slate-700 hover:border-green-500 hover:scale-[1.02] active:scale-[0.98] group"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-xl group-hover:scale-110 transition-transform">
                  <CreditCard className="w-16 h-16 text-white" />
                </div>
                <div>
                  <h3 className="text-white text-2xl mb-2">
                    Escanear DNI
                  </h3>
                  <p className="text-slate-400">
                    Acerca tu documento de identidad
                  </p>
                </div>
              </div>
            </button>

            {/* QR Option */}
            <button
              onClick={() => handleScan('qr')}
              className="w-full bg-slate-800/80 hover:bg-slate-700/80 p-8 rounded-2xl transition-all duration-300 border-2 border-slate-700 hover:border-green-500 hover:scale-[1.02] active:scale-[0.98] group"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-6 rounded-xl group-hover:scale-110 transition-transform">
                  <QrCode className="w-16 h-16 text-white" />
                </div>
                <div>
                  <h3 className="text-white text-2xl mb-2">
                    Código QR
                  </h3>
                  <p className="text-slate-400">
                    Escanea tu código desde la app
                  </p>
                </div>
              </div>
            </button>
          </motion.div>
        )}

        {isScanning && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 border-4 border-green-500 border-t-transparent rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                {method === 'dni' ? (
                  <CreditCard className="w-16 h-16 text-green-500" />
                ) : (
                  <QrCode className="w-16 h-16 text-teal-500" />
                )}
              </div>
            </div>
            
            <h3 className="text-white text-2xl mb-2">
              Escaneando...
            </h3>
            <p className="text-slate-400 text-center mb-8">
              {method === 'dni' 
                ? 'Por favor, mantén tu DNI en la zona de lectura'
                : 'Enfoca tu código QR en el escáner'}
            </p>

            <button
              onClick={handleCancel}
              className="bg-slate-800/80 hover:bg-slate-700/80 text-white px-8 py-4 rounded-xl transition-all duration-300 border border-slate-700 hover:border-slate-600"
            >
              <span className="text-lg">Cancelar</span>
            </button>
          </motion.div>
        )}

        {!isScanning && method && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <CheckCircle2 className="w-32 h-32 text-green-500 mb-6" />
            </motion.div>
            
            <h3 className="text-white text-2xl mb-2">
              ¡Identificado!
            </h3>
            <p className="text-slate-400">
              Accediendo a tu cuenta...
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}