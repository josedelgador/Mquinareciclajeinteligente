import { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Coffee, ShoppingBag, Ticket, Check, Coins, Home } from 'lucide-react';

interface RewardsScreenProps {
  points: number;
  onFinish: () => void;
  onBackToHome?: () => void;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: typeof Gift;
  color: string;
}

export function RewardsScreen({ points, onFinish, onBackToHome }: RewardsScreenProps) {
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  const rewards: Reward[] = [
    {
      id: '1',
      title: 'Café gratis',
      description: 'Un café en tu cafetería favorita',
      points: 50,
      icon: Coffee,
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: '2',
      title: '5% descuento',
      description: 'En tu próxima compra',
      points: 100,
      icon: ShoppingBag,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: '3',
      title: 'Entrada de cine',
      description: 'Vale para una entrada estándar',
      points: 200,
      icon: Ticket,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: '4',
      title: 'Regalo sorpresa',
      description: 'Un regalo especial por tu compromiso',
      points: 300,
      icon: Gift,
      color: 'from-pink-500 to-rose-600'
    }
  ];

  const handleRewardSelection = (rewardId: string) => {
    setSelectedReward(rewardId);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col"
    >
      {/* Header */}
      <div className="bg-slate-900/50 p-6 border-b border-slate-700">
        <h2 className="text-white text-center mb-2">
          Recompensas disponibles
        </h2>
        <div className="flex items-center justify-center gap-2">
          <Coins className="w-5 h-5 text-green-500" />
          <p className="text-green-400">
            Tienes {points} puntos disponibles
          </p>
        </div>
      </div>

      {/* Rewards List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {rewards.map((reward, index) => {
          const canAfford = points >= reward.points;
          const isSelected = selectedReward === reward.id;

          return (
            <motion.button
              key={reward.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => canAfford && handleRewardSelection(reward.id)}
              disabled={!canAfford}
              className={`w-full p-6 rounded-xl transition-all duration-300 border-2 text-left ${
                isSelected
                  ? 'bg-green-500/20 border-green-500 scale-[1.02]'
                  : canAfford
                  ? 'bg-slate-800/50 border-slate-700 hover:border-slate-600 hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-slate-900/30 border-slate-800 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`bg-gradient-to-br ${reward.color} p-4 rounded-xl flex-shrink-0`}>
                  <reward.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white">
                      {reward.title}
                    </h3>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex-shrink-0"
                      >
                        <Check className="w-6 h-6 text-green-500" />
                      </motion.div>
                    )}
                  </div>
                  
                  <p className="text-slate-400 text-sm mb-3">
                    {reward.description}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-green-500" />
                    <span className={canAfford ? 'text-green-400' : 'text-slate-500'}>
                      {reward.points} puntos
                    </span>
                    {!canAfford && (
                      <span className="text-slate-600 text-sm">
                        (Te faltan {reward.points - points})
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Info Message */}
      {selectedReward && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 pb-4"
        >
          <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl">
            <p className="text-green-400 text-center text-sm">
              Recompensa seleccionada. Recibirás un código en tu app móvil.
            </p>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="p-6 space-y-3 border-t border-slate-700">
        {selectedReward && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onFinish}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-5 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-green-500/50 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="text-xl">Confirmar recompensa</span>
          </motion.button>
        )}
        
        <button
          onClick={onFinish}
          className="w-full bg-slate-800/80 hover:bg-slate-700/80 text-white py-5 rounded-2xl transition-all duration-300 border border-slate-700 hover:border-slate-600 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="text-xl">
            {selectedReward ? 'Canjear después' : 'Continuar sin canjear'}
          </span>
        </button>

        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 py-4 rounded-xl transition-all duration-300 border border-slate-600 hover:border-slate-500 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            <span className="text-lg">Volver al inicio</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}