import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { medicineService } from '../services/medicineService';
import { Prescription, NearbyPharmacy } from '../types';
import { MedicineStockCard } from '../components/medicines/MedicineStockCard';
import { Pill, Search, FileText, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

export const Medicines: React.FC = () => {
  const { language } = useApp();
  const t = getTranslation(language);

  const [prescription, setPrescription] = useState<Prescription | null>(null);
  const [nearbyPharmacies, setNearbyPharmacies] = useState<NearbyPharmacy[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NearbyPharmacy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const rx = await medicineService.getLatestPrescription();
        setPrescription(rx);

        const pharm = await medicineService.getNearbyPharmaciesForMedicine('Amoxicillin');
        setNearbyPharmacies(pharm);
      } catch (e) {
        console.error('Failed loading medicine data:', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const res = await medicineService.searchMedicines(searchQuery);
    setSearchResults(res);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
          Digital Health Prescription & Pharmacy Index
        </span>
        <h1 className="text-xl font-extrabold text-slate-900 mt-0.5">{t.medicines.title}</h1>
      </div>

      {/* Manual Search Bar */}
      

      {/* Section 1: Prescribed Medicines from Doctor */}
      {prescription && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-700" />
              <span>{t.medicines.rxHeader} ({prescription.date})</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              {prescription.hospital_name}
            </span>
          </div>

          <div className="space-y-3">
            {prescription.items.map((item) => (
              <MedicineStockCard
                key={item.id}
                item={item}
                nearbyPharmacies={nearbyPharmacies}
              />
            ))}
          </div>
        </section>
      )}

      {/* Manual Search Results if queried */}
      {searchResults.length > 0 && (
        <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <h3 className="font-bold text-slate-900 text-sm">
            Search Results for "{searchQuery}"
          </h3>
          <div className="space-y-2">
            {searchResults.map((pharm) => (
              <div key={pharm.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{pharm.medicine_name} ({pharm.generic_name})</span>
                  <span className="text-emerald-700">Stock Available</span>
                </div>
                <div className="text-slate-600 mt-1">{pharm.name} · {pharm.distance_km} km away</div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
