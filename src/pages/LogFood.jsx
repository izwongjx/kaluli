import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { FOOD_DB } from '../data/foodDb';
import { Search, Plus, Trash2, X, Utensils, IceCream, Cookie, Apple } from 'lucide-react';

const LogFood = () => {
  const { logs, addLog, deleteLog } = useStore();
  const [search, setSearch] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [portion, setPortion] = useState(1);
  const [selectedSubItems, setSelectedSubItems] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [addonQuantities, setAddonQuantities] = useState({});
  const filteredFood = FOOD_DB.filter(f => {
    const matchesSearch = search === '' || f.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggleSubItem = (itemName) => {
    setSelectedSubItems(prev => ({ ...prev, [itemName]: !prev[itemName] }));
  };

  const getCompositeTotal = () => {
    if (!selectedFood || selectedFood.type !== 'composite') return selectedFood?.kcalPerPortion || 0;
    let total = 0;
    selectedFood.items.forEach(item => {
      if (selectedSubItems[item.name]) total += item.kcal;
    });
    return total;
  };

  const updateAddonQuantity = (addonName, delta) => {
    setAddonQuantities(prev => {
      const current = prev[addonName] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [addonName]: next };
    });
  };

  const getBaseTotal = () => {
    let total = selectedFood?.type === 'composite' ? getCompositeTotal() : (selectedFood?.kcalPerPortion || 0);
    if (selectedFood?.addons) {
      selectedFood.addons.forEach(addon => {
        const qty = addonQuantities[addon.name] || 0;
        total += addon.kcal * qty;
      });
    }
    return total;
  };

  const handleAdd = () => {
    if (selectedFood) {
      const baseKcal = getBaseTotal();
      let name = selectedFood.name;
      
      if (selectedFood.type === 'composite') {
        const selectedNames = selectedFood.items.filter(item => selectedSubItems[item.name]).map(item => item.name);
        if (selectedNames.length > 0) {
          name = `${selectedFood.name} (${selectedNames.join(', ')})`;
        }
      }

      if (selectedFood.addons) {
        const addonStrings = selectedFood.addons
          .filter(a => addonQuantities[a.name] > 0)
          .map(a => `+${addonQuantities[a.name]}${a.name}`);
        if (addonStrings.length > 0) {
          name = `${name} ${addonStrings.join(' ')}`;
        }
      }

      addLog({ ...selectedFood, name, kcalPerPortion: baseKcal }, portion);
      setSelectedFood(null);
      setSearch('');
      setPortion(1);
      setSelectedSubItems({});
      setAddonQuantities({});
    }
  };

  return (
    <div className="flex flex-col h-full p-6 pb-24 relative">
      <h1 className="text-2xl font-bold text-slate-700 mb-6 text-center">饮食记录 🍱</h1>
      
      {/* Category Buttons */}
      <div className="flex justify-between items-center mb-6">
        {[
          { name: '主食', icon: <Utensils size={24} /> },
          { name: '甜点', icon: <IceCream size={24} /> },
          { name: '零食', icon: <Cookie size={24} /> },
          { name: '水果', icon: <Apple size={24} /> }
        ].map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <button 
              key={cat.name} 
              onClick={() => setSelectedCategory(isSelected ? null : cat.name)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={`w-16 h-16 rounded-2xl shadow-sm border flex items-center justify-center transition-colors duration-300 ${
                isSelected 
                  ? 'bg-pink text-white border-pink' 
                  : 'bg-white border-pink/20 text-pink group-hover:bg-pink group-hover:text-white'
              }`}>
                {cat.icon}
              </div>
              <span className={`text-xs font-semibold transition-colors ${
                isSelected ? 'text-pink' : 'text-slate-600 group-hover:text-pink'
              }`}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search size={20} className="text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="宝宝今天吃了什么呀？🍱"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white rounded-2xl py-4 pl-12 pr-4 shadow-sm border border-pink/20 focus:outline-none focus:ring-2 focus:ring-pink/50 transition-all font-medium text-slate-700 placeholder:text-slate-400"
        />
      </div>

      {/* Results or Current Logs */}
      <div className="flex-1 overflow-y-auto hide-scrollbar -mx-2 px-2">
        {search !== '' ? (
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">搜索结果</h3>
            {filteredFood.map((food, i) => (
              <div 
                key={i} 
                onClick={() => { setSelectedFood(food); setPortion(1); setSelectedSubItems({}); setAddonQuantities({}); }}
                className="bg-white p-4 rounded-3xl shadow-sm border border-sage/30 flex justify-between items-center cursor-pointer hover:border-pink transition-colors"
              >
                <span className="font-bold text-slate-700">{food.name}</span>
                <span className="text-sm font-semibold text-pink">{food.kcalPerPortion} kcal</span>
              </div>
            ))}
            {filteredFood.length === 0 && (
              <div className="text-center text-slate-400 mt-8 font-medium">找不到这个食物 😭</div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">今日记录</h3>
            {logs.length === 0 ? (
              <div className="text-center text-slate-400 mt-8 font-medium bg-white/50 py-8 rounded-3xl border border-dashed border-slate-300">
                今天还没吃东西呢！<br/>要吃点零食吗？ 👀
              </div>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="bg-white p-4 rounded-3xl shadow-sm border border-pink/20 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-700">{log.food.name}</div>
                    <div className="text-xs font-medium text-slate-400 mt-1">
                      {log.portion} 份 · {Math.round(log.portion * log.food.kcalPerPortion)} kcal
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteLog(i)}
                    className="p-2 text-slate-300 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Portion Selector Modal Slide-up */}
      <div className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-4xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6 transition-transform duration-300 transform ${selectedFood ? 'translate-y-0' : 'translate-y-full'} z-40`}>
        {selectedFood && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-slate-700">{selectedFood.name}</h3>
              <button onClick={() => { setSelectedFood(null); setSelectedSubItems({}); setAddonQuantities({}); }} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            {selectedFood.type === 'composite' ? (
              <div className="mb-6 max-h-48 overflow-y-auto hide-scrollbar border border-pink/20 rounded-2xl p-2 bg-white/50">
                <p className="text-sm text-slate-500 font-medium mb-2 px-2">选择配菜：</p>
                {selectedFood.items.map(item => {
                  const isSelected = !!selectedSubItems[item.name];
                  return (
                    <div 
                      key={item.name} 
                      onClick={() => handleToggleSubItem(item.name)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors mb-2 border ${isSelected ? 'border-pink bg-pink/10' : 'border-transparent hover:bg-slate-50'}`}
                    >
                      <span className={`font-medium ${isSelected ? 'text-pink' : 'text-slate-700'}`}>{item.name}</span>
                      <span className={`text-sm font-semibold ${isSelected ? 'text-pink' : 'text-slate-400'}`}>{item.kcal} kcal</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-slate-500 font-medium mb-4">选择份量</p>
            )}

            {selectedFood.addons && (
              <div className="mb-6 border border-pink/20 rounded-2xl p-2 bg-white/50">
                <p className="text-sm text-slate-500 font-medium mb-2 px-2">附加配料：</p>
                {selectedFood.addons.map(addon => (
                  <div key={addon.name} className="flex items-center justify-between p-3 rounded-xl border border-transparent hover:bg-slate-50 transition-colors">
                    <div>
                      <span className="font-medium text-slate-700">{addon.name}</span>
                      <span className="text-sm font-semibold text-slate-400 ml-2">(+{addon.kcal} kcal)</span>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-100 rounded-xl px-3 py-1">
                      <button onClick={() => updateAddonQuantity(addon.name, -1)} className="text-slate-400 hover:text-pink font-bold text-lg">-</button>
                      <span className="font-bold text-slate-700 w-4 text-center">{addonQuantities[addon.name] || 0}</span>
                      <button onClick={() => updateAddonQuantity(addon.name, 1)} className="text-slate-400 hover:text-pink font-bold text-lg">+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-center gap-2 flex-wrap mb-6">
              {[0.5, 1, 1.5, 2, 2.5, 3].map(p => (
                <button
                  key={p}
                  onClick={() => setPortion(p)}
                  className={`w-12 h-12 rounded-2xl font-bold transition-all ${
                    portion === p 
                      ? 'bg-pink text-white shadow-soft scale-110' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            
            <div className="text-center mb-6 bg-pink/10 py-3 rounded-2xl">
              <span className="font-bold text-pink text-lg">
                {portion} × {getBaseTotal()} = {Math.round(portion * getBaseTotal())} kcal
              </span>
            </div>
            
            <button 
              onClick={handleAdd}
              className="w-full bg-pink hover:bg-pink/90 text-white font-bold py-4 rounded-2xl flex justify-center items-center gap-2 transition-colors shadow-soft"
            >
              <Plus size={20} />
              添加 🩷
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LogFood;
