class NutritionScanner {
    constructor() {
        this.stream = null;
        this.analysisHistory = [];
        this.currentAnalysis = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadHistory();
    }

    setupEventListeners() {
        document.getElementById('startCamera').addEventListener('click', () => {
            this.startCamera();
        });

        document.getElementById('captureBtn').addEventListener('click', () => {
            this.captureImage();
        });

        document.getElementById('uploadBtn').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });

        document.getElementById('fileInput').addEventListener('change', (e) => {
            this.handleFileUpload(e);
        });

        document.getElementById('analyzeBtn').addEventListener('click', () => {
            this.analyzeNutrition();
        });

        document.getElementById('retakeBtn').addEventListener('click', () => {
            this.retakePhoto();
        });
    }

    async startCamera() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'environment' // Use back camera on mobile
                } 
            });
            
            const video = document.getElementById('cameraFeed');
            video.srcObject = this.stream;
            
            document.getElementById('captureArea').classList.add('hidden');
            document.getElementById('captureBtn').disabled = false;
            
        } catch (error) {
            console.error('Erro ao acessar a câmera:', error);
            alert('Não foi possível acessar a câmera. Verifique as permissões.');
        }
    }

    captureImage() {
        const video = document.getElementById('cameraFeed');
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        this.displayCapturedImage(imageDataUrl);
        
        // Show scan animation
        document.getElementById('scanOverlay').classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('scanOverlay').classList.add('hidden');
        }, 2000);
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecione apenas arquivos de imagem.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.displayCapturedImage(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    displayCapturedImage(imageDataUrl) {
        document.getElementById('foodImage').src = imageDataUrl;
        document.getElementById('capturedImage').classList.remove('hidden');
        
        // Quick analysis
        this.performQuickAnalysis(imageDataUrl);
    }

    performQuickAnalysis(imageDataUrl) {
        const quickAnalysis = document.getElementById('quickAnalysis');
        
        // Simulate AI recognition
        const recognizedFoods = this.simulateAIRecognition();
        
        quickAnalysis.innerHTML = `
            <div class="space-y-4">
                <div class="text-center">
                    <div class="text-4xl mb-2">${recognizedFoods.emoji}</div>
                    <h3 class="text-xl font-bold text-gray-800">${recognizedFoods.name}</h3>
                    <p class="text-sm text-gray-600">Confiança: ${recognizedFoods.confidence}%</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-green-100 p-3 rounded-lg text-center">
                        <div class="text-2xl font-bold text-green-600">${recognizedFoods.calories}</div>
                        <div class="text-sm text-gray-600">Calorias</div>
                    </div>
                    <div class="bg-blue-100 p-3 rounded-lg text-center">
                        <div class="text-2xl font-bold text-blue-600">${recognizedFoods.protein}g</div>
                        <div class="text-sm text-gray-600">Proteína</div>
                    </div>
                    <div class="bg-yellow-100 p-3 rounded-lg text-center">
                        <div class="text-2xl font-bold text-yellow-600">${recognizedFoods.carbs}g</div>
                        <div class="text-sm text-gray-600">Carboidratos</div>
                    </div>
                    <div class="bg-purple-100 p-3 rounded-lg text-center">
                        <div class="text-2xl font-bold text-purple-600">${recognizedFoods.fat}g</div>
                        <div class="text-sm text-gray-600">Gordura</div>
                    </div>
                </div>
                
                <div class="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">💡 Dica Nutricional</h4>
                    <p class="text-sm text-gray-600">${recognizedFoods.tip}</p>
                </div>
            </div>
        `;
    }

    simulateAIRecognition() {
        const foods = [
            {
                name: 'Maçã Vermelha',
                emoji: '🍎',
                confidence: 94,
                calories: 52,
                protein: 0.3,
                carbs: 14,
                fat: 0.2,
                tip: 'Rica em fibras e antioxidantes. Ótima para lanches saudáveis!'
            },
            {
                name: 'Banana',
                emoji: '🍌',
                confidence: 91,
                calories: 89,
                protein: 1.1,
                carbs: 23,
                fat: 0.3,
                tip: 'Excelente fonte de potássio e energia rápida para exercícios.'
            },
            {
                name: 'Salada Verde',
                emoji: '🥗',
                confidence: 88,
                calories: 25,
                protein: 2.5,
                carbs: 5,
                fat: 0.3,
                tip: 'Baixa em calorias e rica em vitaminas. Perfeita para dietas!'
            },
            {
                name: 'Sanduíche',
                emoji: '🥪',
                confidence: 85,
                calories: 250,
                protein: 12,
                carbs: 30,
                fat: 8,
                tip: 'Equilibre com vegetais para uma refeição mais nutritiva.'
            },
            {
                name: 'Pizza',
                emoji: '🍕',
                confidence: 92,
                calories: 285,
                protein: 12,
                carbs: 36,
                fat: 10,
                tip: 'Consuma com moderação. Adicione salada para equilibrar.'
            }
        ];

        return foods[Math.floor(Math.random() * foods.length)];
    }

    async analyzeNutrition() {
        this.showLoading(true);
        
        // Simulate AI processing time
        await this.delay(3000);
        
        const detailedAnalysis = this.generateDetailedAnalysis();
        this.displayDetailedResults(detailedAnalysis);
        this.addToHistory(detailedAnalysis);
        
        this.showLoading(false);
    }

    generateDetailedAnalysis() {
        const baseFood = this.simulateAIRecognition();
        
        return {
            id: Date.now(),
            timestamp: new Date(),
            food: baseFood,
            portion: '100g',
            nutritionFacts: {
                calories: baseFood.calories,
                protein: baseFood.protein,
                carbs: baseFood.carbs,
                fat: baseFood.fat,
                fiber: Math.round(baseFood.carbs * 0.1 * 10) / 10,
                sugar: Math.round(baseFood.carbs * 0.6 * 10) / 10,
                sodium: Math.round(Math.random() * 200),
                calcium: Math.round(Math.random() * 100),
                iron: Math.round(Math.random() * 5 * 10) / 10,
                vitaminC: Math.round(Math.random() * 50)
            },
            healthScore: Math.round(60 + Math.random() * 35),
            recommendations: [
                'Combine com proteínas para uma refeição balanceada',
                'Beba água para melhor digestão',
                'Consuma com moderação se estiver em dieta'
            ],
            allergens: ['Pode conter traços de glúten'],
            benefits: [
                'Rico em antioxidantes',
                'Boa fonte de fibras',
                'Baixo índice glicêmico'
            ]
        };
    }

    displayDetailedResults(analysis) {
        document.getElementById('detailedResults').classList.remove('hidden');
        
        const container = document.getElementById('nutritionResults');
        container.innerHTML = `
            <div class="grid lg:grid-cols-3 gap-8">
                <!-- Informações Básicas -->
                <div class="lg:col-span-1">
                    <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 mb-6">
                        <div class="text-center mb-4">
                            <div class="text-6xl mb-2">${analysis.food.emoji}</div>
                            <h3 class="text-2xl font-bold text-gray-800">${analysis.food.name}</h3>
                            <p class="text-gray-600">Porção: ${analysis.portion}</p>
                        </div>
                        
                        <div class="text-center">
                            <div class="text-4xl font-bold text-green-600 mb-2">${analysis.healthScore}/100</div>
                            <div class="text-sm text-gray-600">Pontuação de Saúde</div>
                            <div class="w-full bg-gray-200 rounded-full h-3 mt-2">
                                <div class="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full" style="width: ${analysis.healthScore}%"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Benefícios -->
                    <div class="bg-green-50 rounded-xl p-6 mb-6">
                        <h4 class="text-lg font-bold text-green-800 mb-3">✅ Benefícios</h4>
                        <ul class="space-y-2">
                            ${analysis.benefits.map(benefit => `
                                <li class="text-sm text-green-700 flex items-center">
                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    ${benefit}
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <!-- Alergênicos -->
                    <div class="bg-yellow-50 rounded-xl p-6">
                        <h4 class="text-lg font-bold text-yellow-800 mb-3">⚠️ Alergênicos</h4>
                        <ul class="space-y-2">
                            ${analysis.allergens.map(allergen => `
                                <li class="text-sm text-yellow-700">${allergen}</li>
                            `).join('')}
                        </ul>
                    </div>
                </div>

                <!-- Informações Nutricionais -->
                <div class="lg:col-span-2">
                    <div class="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
                        <h3 class="text-xl font-bold text-gray-800 mb-6">📊 Informações Nutricionais</h3>
                        
                        <div class="grid md:grid-cols-2 gap-6">
                            <!-- Macronutrientes -->
                            <div>
                                <h4 class="font-semibold text-gray-700 mb-4">Macronutrientes</h4>
                                <div class="space-y-3">
                                    <div class="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                                        <span class="font-medium">Calorias</span>
                                        <span class="font-bold text-red-600">${analysis.nutritionFacts.calories} kcal</span>
                                    </div>
                                    <div class="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                        <span class="font-medium">Proteínas</span>
                                        <span class="font-bold text-blue-600">${analysis.nutritionFacts.protein}g</span>
                                    </div>
                                    <div class="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                                        <span class="font-medium">Carboidratos</span>
                                        <span class="font-bold text-yellow-600">${analysis.nutritionFacts.carbs}g</span>
                                    </div>
                                    <div class="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                                        <span class="font-medium">Gorduras</span>
                                        <span class="font-bold text-purple-600">${analysis.nutritionFacts.fat}g</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Micronutrientes -->
                            <div>
                                <h4 class="font-semibold text-gray-700 mb-4">Micronutrientes</h4>
                                <div class="space-y-3">
                                    <div class="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                        <span class="font-medium">Fibras</span>
                                        <span class="font-bold text-green-600">${analysis.nutritionFacts.fiber}g</span>
                                    </div>
                                    <div class="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                                        <span class="font-medium">Açúcares</span>
                                        <span class="font-bold text-pink-600">${analysis.nutritionFacts.sugar}g</span>
                                    </div>
                                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span class="font-medium">Sódio</span>
                                        <span class="font-bold text-gray-600">${analysis.nutritionFacts.sodium}mg</span>
                                    </div>
                                    <div class="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                                        <span class="font-medium">Cálcio</span>
                                        <span class="font-bold text-indigo-600">${analysis.nutritionFacts.calcium}mg</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Gráfico de Macronutrientes -->
                        <div class="mt-8">
                            <h4 class="font-semibold text-gray-700 mb-4">Distribuição de Macronutrientes</h4>
                            <div class="flex h-8 rounded-lg overflow-hidden">
                                <div class="bg-blue-500 flex items-center justify-center text-white text-xs font-semibold" style="width: ${(analysis.nutritionFacts.protein * 4 / analysis.nutritionFacts.calories * 100)}%">
                                    Proteína
                                </div>
                                <div class="bg-yellow-500 flex items-center justify-center text-white text-xs font-semibold" style="width: ${(analysis.nutritionFacts.carbs * 4 / analysis.nutritionFacts.calories * 100)}%">
                                    Carboidrato
                                </div>
                                <div class="bg-purple-500 flex items-center justify-center text-white text-xs font-semibold" style="width: ${(analysis.nutritionFacts.fat * 9 / analysis.nutritionFacts.calories * 100)}%">
                                    Gordura
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Recomendações -->
                    <div class="bg-blue-50 rounded-xl p-6">
                        <h4 class="text-lg font-bold text-blue-800 mb-4">💡 Recomendações Personalizadas</h4>
                        <div class="space-y-3">
                            ${analysis.recommendations.map(rec => `
                                <div class="flex items-start space-x-3">
                                    <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                    <p class="text-blue-700">${rec}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-8 text-center">
                <button class="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:scale-105 transition-all font-semibold mr-4">
                    📱 Compartilhar Análise
                </button>
                <button class="bg-purple-600 text-white px-8 py-3 rounded-xl hover:scale-105 transition-all font-semibold">
                    📊 Adicionar ao Diário
                </button>
            </div>
        `;

        // Scroll to results
        document.getElementById('detailedResults').scrollIntoView({ behavior: 'smooth' });
    }

    addToHistory(analysis) {
        this.analysisHistory.unshift(analysis);
        this.saveHistory();
        this.renderHistory();
    }

    renderHistory() {
        const container = document.getElementById('analysisHistory');
        const emptyState = document.getElementById('emptyHistory');

        if (this.analysisHistory.length === 0) {
            container.classList.add('hidden');
            emptyState.classList.remove('hidden');
            return;
        }

        container.classList.remove('hidden');
        emptyState.classList.add('hidden');

        container.innerHTML = this.analysisHistory.slice(0, 6).map(analysis => `
            <div class="nutrition-card bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200">
                <div class="text-center mb-4">
                    <div class="text-4xl mb-2">${analysis.food.emoji}</div>
                    <h3 class="font-bold text-gray-800">${analysis.food.name}</h3>
                    <p class="text-sm text-gray-500">${this.formatDate(analysis.timestamp)}</p>
                </div>
                
                <div class="grid grid-cols-2 gap-3 mb-4">
                    <div class="bg-red-100 p-2 rounded text-center">
                        <div class="font-bold text-red-600">${analysis.nutritionFacts.calories}</div>
                        <div class="text-xs text-gray-600">kcal</div>
                    </div>
                    <div class="bg-green-100 p-2 rounded text-center">
                        <div class="font-bold text-green-600">${analysis.healthScore}</div>
                        <div class="text-xs text-gray-600">saúde</div>
                    </div>
                </div>
                
                <button class="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg hover:scale-105 transition-all text-sm font-semibold">
                    Ver Detalhes
                </button>
            </div>
        `).join('');
    }

    retakePhoto() {
        document.getElementById('capturedImage').classList.add('hidden');
        document.getElementById('detailedResults').classList.add('hidden');
        
        const quickAnalysis = document.getElementById('quickAnalysis');
        quickAnalysis.innerHTML = `
            <div class="text-center py-12 text-gray-500">
                <div class="text-6xl mb-4">🍎</div>
                <p class="text-lg">Capture ou faça upload de uma nova foto!</p>
            </div>
        `;
    }

    showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        if (show) {
            overlay.classList.remove('hidden');
        } else {
            overlay.classList.add('hidden');
        }
    }

    formatDate(date) {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }

    saveHistory() {
        localStorage.setItem('nutritionHistory', JSON.stringify(this.analysisHistory));
    }

    loadHistory() {
        const saved = localStorage.getItem('nutritionHistory');
        if (saved) {
            this.analysisHistory = JSON.parse(saved).map(item => ({
                ...item,
                timestamp: new Date(item.timestamp)
            }));
            this.renderHistory();
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Inicializar a aplicação
document.addEventListener('DOMContentLoaded', () => {
    new NutritionScanner();
});