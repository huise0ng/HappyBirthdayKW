<template>
    <div class="letters-container">
        <div v-for="letter in letters" :key="letter.id" class="letter" @click="openModal(letter)">
            <div class="letter-envelope">
                <div class="letter-closed">
                    💌 <!-- 편지 모양을 나타내는 아이콘 -->
                </div>
            </div>
        </div>
        <!-- 모달 -->
        <div class="modal" v-if="modalOpened" @click="closeModal">
            <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <h2>{{ modalLetter.name }}</h2>
                <p>{{ modalLetter.content }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export default {
    setup() {
        const letters = ref([]);
        const modalOpened = ref(false);
        const modalLetter = ref({});

        const fetchLetters = () => {
            const lettersCollectionRef = collection(db, 'letters');
            const q = query(lettersCollectionRef, orderBy('createdAt', 'desc'));
            onSnapshot(q, (snapshot) => {
                letters.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            });
        };

        onMounted(fetchLetters);

        const openModal = (letter) => {
            modalLetter.value = letter;
            modalOpened.value = true;
        };

        const closeModal = () => {
            modalOpened.value = false;
        };

        return { letters, openModal, closeModal, modalOpened, modalLetter };
    }
};
</script>

<style scoped>
body {
    background-color: ivory;
    /* 아이보리색 배경 추가 */
}

.letters-container {
    display: flex;
    flex-wrap: wrap;
}

.letter {
    width: 150px;
    height: 200px;
    margin: 10px;
    cursor: pointer;
}

.letter-envelope {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.letter-closed {
    font-size: 3rem;
}

/* 모달 스타일 */
.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fefefe;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    max-width: 80%;
    /* 모달 최대 너비 */
    max-height: 80%;
    /* 모달 최대 높이 */
    overflow-y: auto;
    /* 긴 편지 내용에 대비하여 스크롤바 추가 */
}

.close {
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>
