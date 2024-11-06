import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title, TextInput, Textarea, Select, Button, Group, Text, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { communityService } from '../../services/communityService';
import { fetchCategories } from '../../services/categoryService';

const CreateCommunity = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      categoryId: '',
      subCategoryId: '',
    },
    validate: {
      name: (value) => (value.length > 30 ? '名稱不能超過30個字' : null),
      description: (value) => (value.length > 1000 ? '描述不能超過1000個字' : null),
      categoryId: (value) => (value ? null : '請選擇主分類'),
      subCategoryId: (value) => (value ? null : '請選擇子分類'),
    },
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    loadCategories();
  }, []);

  const handleCategoryChange = (categoryId) => {
    form.setFieldValue('categoryId', categoryId);
    form.setFieldValue('subCategoryId', '');
    const category = categories.find(c => c.id.toString() === categoryId);
    setSubCategories(category ? category.subCategories : []);
  };

  const handleSubmit = async (values) => {
    try {
      await communityService.createCommunity({
        name: values.name,
        description: values.description,
        sub_categories_id: values.subCategoryId,
      });
      navigate('/communities/' + values.subCategoryId);
    } catch (error) {
      console.error('Failed to create community:', error);
    }
  };

  const CharacterCount = ({ current, max }) => (
    <Text size="xs" color="dimmed" ta="right" mt={5}>
      {current}/{max}
    </Text>
  );

  return (
    <Container size="sm">
      <Title order={2} mb="md">建立新社群</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box mb="md">
          <TextInput
            label="社群名稱"
            placeholder="輸入社群名稱"
            {...form.getInputProps('name')}
          />
          <CharacterCount current={form.values.name.length} max={30} />
        </Box>
        <Box mb="md">
          <Textarea
            label="社群描述"
            placeholder="輸入社群描述"
            {...form.getInputProps('description')}
          />
          <CharacterCount current={form.values.description.length} max={1000} />
        </Box>
        <Select
          label="主分類"
          placeholder="選擇主分類"
          data={categories.map(category => ({ value: category.id.toString(), label: category.name }))}
          {...form.getInputProps('categoryId')}
          onChange={handleCategoryChange}
          mb="md"
        />
        <Select
          label="子分類"
          placeholder="選擇子分類"
          data={subCategories.map(subCategory => ({ value: subCategory.id.toString(), label: subCategory.name }))}
          {...form.getInputProps('subCategoryId')}
          disabled={!form.values.categoryId}
          mb="md"
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">建立社群</Button>
        </Group>
      </form>
    </Container>
  );
};

export default CreateCommunity;
