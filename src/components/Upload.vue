<script setup lang="ts">
const { state } = useStore();

const refresh = () => {
  if (!state.refetch) {
    state.refetch = true
  }
  state.refetch = !state.refetch
  state.refetch = true
}

const props = defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
  accept: {
    type: String,
    default: "*/*",
  },
  url: {
    type: String,
    required: true,
  },
});

const fileData = ref<{
  name: string;
  size: number;
  contentType: string;
  lastModified: number;
  url: string;
  file: File;
}>();

function onDrop(file: File | null) {
  if (!file) return;
  if (file) {
    fileData.value = {
      name: file.name,
      size: file.size,
      contentType: file.type,
      lastModified: file.lastModified,
      url: URL.createObjectURL(file),
      file: file,
    };
  }
}

const handleInput = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.multiple = false;
  input.onchange = () => {
    onDrop(input.files![0]);
  };
  input.click();
};

const upload = async (file: {
  name: string;
  size: number;
  contentType: string;
  lastModified: number;
  url: string;
  file: File;
}) => {
  const formData = new FormData();
  formData.append("file", file.file);
  const res = await fetch(
    `/api/${props.url}`,
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await res.json();
  state.notifications.push({
    message: "File uploaded",
    status: "success",
  });
  return data;
};
</script>
<template>
  <div class="col center">
    <label for="singleFile" name="file" class="dropzone" @click="handleInput">
      <div v-if="fileData">
        <slot :data="fileData"></slot>
            <button
        class="btn-get"
        @click="
          upload(fileData!);
        $emit('close');
        refresh();
        "
      >
        Upload
      </button>
      <button 
      class="btn-del"
      @click="fileData = undefined"
      >
        Cancel
      </button>

      </div>
      <div v-else>Click to upload</div>
      <input
        type="file"
        :multiple="props.multiple"
        id="singleFile"
        class="hidden"
        :accept="props.accept"
      />
    </label>
  </div>
</template>
