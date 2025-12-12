import { motion } from 'motion/react';
import { ArrowLeft, Scan, Package, Gift, TrendingUp } from 'lucide-react';

interface HowItWorksScreenProps {
  onBack: () => void;
}

export function HowItWorksScreen({ onBack }: HowItWorksScreenProps) {
  const steps = [
    {
      icon: Scan,
      title: 'Identifícate',
      description: 'Escanea tu DNI o código QR para iniciar sesión'
    },
    {
      icon: Package,
      title: 'Deposita envases',
      description: 'Introduce botellas, latas y envases en la máquina'
    },
    {
      icon: TrendingUp,
      title: 'Acumula puntos',
      description: 'Cada envase suma puntos a tu cuenta'
    },
    {
      icon: Gift,
      title: 'Canjea recompensas',
      description: 'Usa tus puntos para obtener descuentos y premios'
    }
  ];

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
          ¿Cómo funciona?
        </h2>
        <p className="text-slate-400 text-center">
          Sigue estos sencillos pasos
        </p>
      </div>

      {/* Steps */}
      <div className="flex-1 flex flex-col justify-center space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            className="flex items-start gap-4 bg-slate-800/50 p-6 rounded-xl border border-slate-700/50"
          >
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl flex-shrink-0">
              <step.icon className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-green-400 text-xl">
                  {index + 1}.
                </span>
                <h3 className="text-white">
                  {step.title}
                </h3>
              </div>
              <p className="text-slate-400">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onBack}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-5 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-green-500/50 hover:scale-[1.02] active:scale-[0.98] mt-6"
      >
        <span className="text-xl">Entendido</span>
      </motion.button>
    </motion.div>
  );
}
