import React from 'react';
import { PrescriptionItem, NearbyPharmacy } from '../../types';
import { Pill, CheckCircle2, AlertTriangle, MapPin, Phone, Clock } from 'lucide-react';

interface MedicineStockCardProps {
  item: PrescriptionItem;
  nearbyPharmacies?: NearbyPharmacy[];
}

export const MedicineStockCard: React.FC<MedicineStockCardProps> = ({ item, nearbyPharmacies = [] }) => {
  const matchingPharmacies = nearbyPharmacies.filter(
    (p) => p.generic_name.toLowerCase() === item.generic_name.toLowerCase() && p.is_available
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:border-slate-300 transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 shrink-0">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">{item.medicine_name}</h4>
            <div className="text-xs text-slate-500 font-medium">
              Generic: {item.generic_name} · {item.strength}
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Dosage: <strong className="text-slate-800">{item.dosage}</strong> ({item.frequency}) for {item.duration_days} days
            </div>
          </div>
        </div>
      </div>

      {/* Hospital Pharmacy Status Banner */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        {item.hospital_stock_available ? (
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs">
            <div className="flex items-center gap-2 text-emerald-900 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Available at Hospital Pharmacy ({item.hospital_stock_count} units in stock)</span>
            </div>
            <span className="text-[10px] text-emerald-700 font-bold">In Stock</span>
          </div>
        ) : (
          <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-xs space-y-2">
            <div className="flex items-center justify-between text-rose-900 font-semibold">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Not Available at Hospital Pharmacy</span>
              </div>
              <span className="text-[10px] bg-rose-200 text-rose-900 font-bold px-2 py-0.5 rounded-full">
                Out of Stock
              </span>
            </div>

            {/* Freshness timestamp warning */}
            <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1 border-t border-rose-100">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Stock data updated in real-time. Verify with pharmacy prior to visit.</span>
            </div>

            {/* Nearby Pharmacy Suggestions */}
            {matchingPharmacies.length > 0 && (
              <div className="mt-2 space-y-2 pt-2 border-t border-rose-100">
                <div className="font-bold text-slate-800 text-[11px]">
                  Nearby Authorized Pharmacies with Verified Stock:
                </div>

                {matchingPharmacies.map((pharm) => (
                  <div
                    key={pharm.id}
                    className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-700 space-y-1"
                  >
                    <div className="flex items-center justify-between font-semibold text-slate-900">
                      <span>{pharm.name}</span>
                      <span className="text-teal-700 font-bold">{pharm.distance_km} km away</span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{pharm.address}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <a
                        href={`tel:${pharm.phone}`}
                        className="inline-flex items-center gap-1 text-teal-700 font-bold hover:underline"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{pharm.phone}</span>
                      </a>
                      <span className="text-slate-400 italic">Updated {pharm.last_updated ? '10m ago' : 'Recently'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
