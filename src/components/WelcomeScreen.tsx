import { motion } from 'motion/react';
import { Recycle, Info } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  onHowItWorks: () => void;
}

export function WelcomeScreen({ onStart, onHowItWorks }: WelcomeScreenProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center p-8 relative"
    >
      {/* Logo and Title */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center mb-12"
      >
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-full">
            <Recycle className="w-24 h-24 text-white" strokeWidth={2.5} />
          </div>
        </div>
        
        <h1 className="text-white text-center mb-3">
          EcoRecicla
        </h1>
        <p className="text-green-400 text-center max-w-md">
          Máquina Inteligente de Reciclaje
        </p>
      </motion.div>

      {/* Main Buttons */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-md space-y-4"
      >
        <button
          onClick={onStart}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-green-500/50 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="text-2xl">Empezar</span>
        </button>

        <button
          onClick={onHowItWorks}
          className="w-full bg-slate-800/80 hover:bg-slate-700/80 text-white py-6 rounded-2xl transition-all duration-300 border-2 border-slate-700 hover:border-slate-600 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
        >
          <Info className="w-6 h-6" />
          <span className="text-2xl">¿Cómo funciona?</span>
        </button>
      </motion.div>

      {/* Footer Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-8 text-center"
      >
        <p className="text-slate-400 text-sm">
          Recicla y gana recompensas
        </p>
      </motion.div>
    </motion.div>
  );
}
