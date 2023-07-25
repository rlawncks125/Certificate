<script setup lang="ts">
import {
  QuestionTypeShortPram,
  QuestionTypeOther,
} from "~/composables/useQuestion";
import useSolveQuestion from "~/store/useSolveQuestion";

const router = useRouter();

const { batch } = useSolveQuestion();

const short = useState<QuestionTypeShortPram[]>(() => []);
const shortCount = useState<number>(() => 0);
const descriptive = useState<QuestionTypeShortPram[]>(() => []);
const descriptiveCount = useState<number>(() => 0);
const working = useState<QuestionTypeShortPram[]>(() => []);
const workingCount = useState<number>(() => 0);
const other = useState<QuestionTypeOther[]>(() => []);
const otherCount = useState<number>(() => 0);

const isLoading = ref(false);

const questionMapper: { [key in QuestionTypeShortPram]: number } = {
  시스템보안: 0,
  네트워크보안: 1,
  어플리케이션보안: 2,
  "침해사고 분석 및 대응": 3,
};
const questionOhterMapper: { [key in QuestionTypeOther]: number } = {
  "설비보전-공압": 11,
  "설비보전-유압": 12,
};

/** model = checkbox  */
const typeMapper = reactive({
  0: {
    title: "단답형",
    name: "short",
    model: short,
    count: shortCount,
  },
  1: {
    title: "서술형",
    name: "desc",
    model: descriptive,
    count: descriptiveCount,
  },
  2: {
    title: "실무형",
    name: "working",
    model: working,
    count: workingCount,
  },
});

const typeOhterMapper = reactive({
  0: {
    title: "기타",
    name: "other",
    model: other,
    count: otherCount,
  },
});

const renderMapper = {
  기타: { question: questionOhterMapper, type: typeOhterMapper },
  정보보안: { question: questionMapper, type: typeMapper },
};

const batchQuestion = () => {
  isLoading.value = true;
  batch({
    short: {
      types: toRaw(short.value),
      count: shortCount.value,
    },
    descriptive: {
      types: toRaw(descriptive.value),
      count: descriptiveCount.value,
    },
    working: {
      types: toRaw(working.value),
      count: workingCount.value,
    },
    other: {
      types: toRaw(other.value),
      count: otherCount.value,
    },
  }).then(() => {
    isLoading.value = false;
    router.push("/solve");
  });
};
</script>

<template>
  <div>bacthSolve</div>
  <div>
    <div v-if="isLoading">불러오는중...</div>
    <button v-else @click="batchQuestion">선택 완료</button>
  </div>

  <div v-for="mapper in renderMapper">
    <div v-for="(item, key) in mapper.type" :key="key">
      <h2>{{ item.title }}</h2>
      <div>
        <input
          type="number"
          :id="`${item.name}-count`"
          v-model="item.count"
          min="0"
        />
        <label :for="`${item.name}-count`"> 개</label>
      </div>

      <div class="flex mt-4 h-auto items-center gap-2 flex-wrap">
        <div
          v-for="(value, key) in mapper.question"
          :key="`${item.name}-${value}`"
        >
          <input
            type="checkbox"
            :id="`${item.name}-${value}`"
            :value="key"
            v-model="item.model"
          />
          <label :for="`${item.name}-${value}`">{{ key }}</label>
        </div>
      </div>
    </div>
  </div>

  <!-- 정보보안 문제 -->
  <!-- <div v-for="(item, key) in typeMapper" :key="key">
    <h2>{{ item.title }}</h2>
    <div>
      <input
        type="number"
        :id="`${item.name}-count`"
        v-model="item.count"
        min="0"
      />
      <label :for="`${item.name}-count`"> 개</label>
    </div>

    <div class="flex h-20 items-center gap-2">
      <div
        v-for="(value, key) in questionMapper"
        :key="`${item.name}-${value}`"
      >
        <input
          type="checkbox"
          :id="`${item.name}-${value}`"
          :value="key"
          v-model="item.model"
        />
        <label :for="`${item.name}-${value}`">{{ key }}</label>
      </div>
    </div>
  </div> -->
  <!-- 기타문제 -->
  <!-- <div v-for="(item, key) in typeOhterMapper" :key="key">
    <h2>{{ item.title }}</h2>
    <div>
      <input
        type="number"
        :id="`${item.name}-count`"
        v-model="item.count"
        min="0"
      />
      <label :for="`${item.name}-count`"> 개</label>
    </div>

    <div class="flex h-20 items-center gap-2">
      <div
        v-for="(value, key) in questionOhterMapper"
        :key="`${item.name}-${value}`"
      >
        <input
          type="checkbox"
          :id="`${item.name}-${value}`"
          :value="key"
          v-model="item.model"
        />
        <label :for="`${item.name}-${value}`">{{ key }}</label>
      </div>
    </div>
  </div> -->
</template>

<style lang="scss">
input[type="checkbox"] {
  display: none;
}
input[type="checkbox"] + label {
  transition: all 0.2s;
  @apply text-white bg-black hover:bg-black/80 focus:ring-4 focus:outline-none focus:ring-black/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-black/80 dark:focus:ring-black/40 mr-2 mb-2;
  @apply cursor-pointer;
}

input[type="checkbox"]:checked + label {
  @apply text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2;
}
</style>
