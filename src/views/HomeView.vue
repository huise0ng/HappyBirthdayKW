<template>
  <div class="write-letter">
    <h1>강원이에게 편지쓰기</h1>
    <input v-model="newLetter.name" placeholder="강원이에게 보여질 이름을 써주세요" class="english-font" />
    <textarea v-model="newLetter.content" placeholder="편지 내용을 적어주세요" class="english-font"></textarea>
    <button @click="saveLetter">편지 보내기</button>

    <!-- 확인 팝업 -->
    <div class="confirmation-modal" v-if="confirmationVisible">
      <div class="modal-content">
        <p>정상적으로 보냈습니다.</p>
        <button @click="closeConfirmation">확인</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { db } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default {
  setup() {
    const newLetter = ref({ name: '', content: '' });
    const confirmationVisible = ref(false);

    const saveLetter = async () => {
      if (newLetter.value.name.trim() && newLetter.value.content.trim()) {
        await addDoc(collection(db, "letters"), {
          name: newLetter.value.name,
          content: newLetter.value.content,
          createdAt: new Date()
        });
        confirmationVisible.value = true;
      } else {
        alert('편지를 입력하세요.');
      }
    };

    const closeConfirmation = () => {
      confirmationVisible.value = false;
      newLetter.value = { name: '', content: '' };
    };

    return { newLetter, confirmationVisible, saveLetter, closeConfirmation };
  }
};
</script>

<style scoped>
.write-letter {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
}

.write-letter input,
.write-letter textarea {
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: 'Arial', sans-serif;
}

.write-letter button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.write-letter button:hover {
  background-color: #45a049;
}

.confirmation-modal {
  position: fixed;
  top: 0;
  left: 0;
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
}

.modal-content button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #45a049;
}
</style>
