'use client';
import { useAlert } from '@/shared/hooks/useAlert';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import checkIcon from '@/shared/assets/images/svg/check_alert.svg';

const GlobalAlert = () => {
    const { alert } = useAlert();

    return (
        <AnimatePresence>
            {alert.visible && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[1000] flex items-center justify-center px-4"
                >
                    <div className="w-full max-w-sm bg-red-500 text-white rounded-xl shadow-xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-white rounded-md w-6 h-6 flex items-center justify-center">
                                <Image src={checkIcon} alt="Success" width={16} height={16} />
                            </div>
                            <p className="font-bold text-base leading-tight">{alert.message}</p>
                        </div>
                        {alert.description && (
                            <p className="text-sm mt-2 ml-9 leading-snug">{alert.description}</p>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlobalAlert;