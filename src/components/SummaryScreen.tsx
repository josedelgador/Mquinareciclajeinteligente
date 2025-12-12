import { motion } from 'motion/react';
import { CheckCircle2, Package, Scale, Coins, TrendingUp, Home } from 'lucide-react';
import { SessionData } from '../App';

interface SummaryScreenProps {
  sessionData: SessionData;
  onContinue: () => void;
  onBackToHome?: () => void;
}

export function SummaryScreen({ sessionData, onContinue, onBackToHome }: SummaryScreenProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col p-8"
    >
      {/* Success Header */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          className="inline-block mb-4"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <CheckCircle2 className="relative w-24 h-24 text-green-500" />
          </div>
        </motion.div>
        
        <h2 className="text-white mb-2">
          ¡Operación completada!
        </h2>
        <p className="text-slate-400">
          Gracias por contribuir al medio ambiente
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="flex-1 space-y-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"
        >
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/20 p-4 rounded-xl">
              <Package className="w-8 h-8 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="text-slate-400 text-sm mb-1">Envases depositados</p>
              <p className="text-white text-3xl">
                {sessionData.containers}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"
        >
          <div className="flex items-center gap-4">
            <div className="bg-purple-500/20 p-4 rounded-xl">
              <Scale className="w-8 h-8 text-purple-500" />
            </div>
            <div className="flex-1">
              <p className="text-slate-400 text-sm mb-1">Peso total reciclado</p>
              <p className="text-white text-3xl">
                {sessionData.kilos.toFixed(3)} kg
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-green-500/20 to-emerald-600/10 border-2 border-green-500/50 p-6 rounded-xl"
        >
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl">
              <Coins className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-slate-400 text-sm mb-1">Puntos ganados</p>
              <p className="text-white text-3xl">
                {sessionData.points}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Environmental Impact */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-teal-500/10 border border-teal-500/30 p-6 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <TrendingUp className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
            <div>
              <p className="text-white mb-2">
                Impacto ambiental
              </p>
              <p className="text-slate-400 text-sm">
                Has evitado la emisión de aproximadamente <span className="text-teal-400">{(sessionData.kilos * 2.5).toFixed(2)} kg de CO₂</span> al reciclar estos envases.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Continue Button */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={onContinue}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-5 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-green-500/50 hover:scale-[1.02] active:scale-[0.98] mt-6"
      >
        <span className="text-xl">Ver recompensas disponibles</span>
      </motion.button>

      {onBackToHome && (
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          onClick={onBackToHome}
          className="w-full bg-slate-800/80 hover:bg-slate-700/80 text-white py-4 rounded-xl transition-all duration-300 border border-slate-700 hover:border-slate-600 flex items-center justify-center gap-2 mt-3"
        >
          <Home className="w-5 h-5" />
          <span className="text-lg">Volver al inicio</span>
        </motion.button>
      )}
    </motion.div>
  );
}