class HeapSorter {
    constructor() {
        this.heap = [];
        this.steps = [];
    }

    generateRandomHeap() {
        this.heap = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        
        for (let i = this.heap.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
        }
        
        this.steps.push({
            type: 'Heap Inicial Desordenado',
            heap: [...this.heap],
            message: 'Heap inicial gerado e desordenado'
        });
    }

    buildMaxHeap() {
        const n = this.heap.length;
        
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.heapify(i, n);
            
            this.steps.push({
                type: 'Ajustando Posição',
                heap: [...this.heap],
                position: i,
                message: `Ajustando posição ${i} (valor ${this.heap[i]})`
            });
        }
        
        this.steps.push({
            type: 'Max-Heap Construído',
            heap: [...this.heap],
            message: 'Heap máximo construído'
        });
    }

    heapify(idx, max) {
        let left = 2 * idx + 1;
        let right = 2 * idx + 2;
        let largest = idx;
        
        if (left < max && this.heap[left] > this.heap[largest]) {
            largest = left;
        }
        
        if (right < max && this.heap[right] > this.heap[largest]) {
            largest = right;
        }
        
        if (largest !== idx) {
            [this.heap[idx], this.heap[largest]] = [this.heap[largest], this.heap[idx]];
            this.heapify(largest, max);
        }
    }

    heapSort() {
        this.buildMaxHeap();
        
        for (let i = this.heap.length - 1; i > 0; i--) {
            [this.heap[0], this.heap[i]] = [this.heap[i], this.heap[0]];
            
            this.steps.push({
                type: 'Movendo Raiz',
                heap: [...this.heap],
                position: i,
                message: `Movido raiz (${this.heap[i]}) para posição ${i}`
            });
            
            this.heapify(0, i);
            
            this.steps.push({
                type: 'Reconstruindo Heap',
                heap: [...this.heap],
                position: i,
                message: `Reconstruindo heap até posição ${i-1}`
            });
        }
        
        this.steps.push({
            type: 'Heap Final Ordenado',
            heap: [...this.heap],
            message: 'Heap completamente ordenado'
        });
    }

    displaySteps() {
        console.log('=== PASSO A PASSO DO HEAP SORT ===\n');
        
        this.steps.forEach((step, index) => {
            console.log(`Passo ${index + 1}: ${step.type}`);
            console.log(`   - ${step.message}`);
            console.log(`   - Heap atual: [${step.heap.join(', ')}]`);
            
            if (step.position !== undefined) {
                console.log(`   - Posição ajustada: ${step.position}`);
            }
            
            if (step.type.includes('Ajustando')) {
                this.visualizeHeap(step.heap, step.position);
            }
            
            console.log('');
        });
    }

    visualizeHeap(heap, highlight = -1) {
        const levels = Math.ceil(Math.log2(heap.length + 1));
        let idx = 0;
        
        for (let i = 0; i < levels; i++) {
            const spaces = ' '.repeat(2 * (levels - i - 1));
            const nodes = Math.pow(2, i);
            let line = spaces;
            
            for (let j = 0; j < nodes && idx < heap.length; j++) {
                const value = idx === highlight ? `[${heap[idx]}]` : heap[idx];
                line += value + ' '.repeat(4 * (levels - i));
                idx++;
            }
            
            console.log(line);
        }
    }
}

const sorter = new HeapSorter();
sorter.generateRandomHeap();
sorter.heapSort();
sorter.displaySteps();