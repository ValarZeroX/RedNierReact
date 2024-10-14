import React, { useState, useEffect } from 'react';
import { Container, Title, Text, Paper, Button, Group, Avatar, TextInput, Stack } from '@mantine/core';
import { IconEdit, IconDeviceFloppy } from '@tabler/icons-react';
import { useForm } from '@mantine/form';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      bio: '',
    },
  });

  useEffect(() => {
    // 這裡應該從後端 API 獲取用戶數據
    // 為了示例，我們使用模擬數據
    const mockUser = {
      name: '張三',
      email: 'zhangsan@example.com',
      bio: '我是一名熱愛學習的學生。',
      avatarUrl: 'https://example.com/avatar.jpg',
    };
    setUser(mockUser);
    form.setValues(mockUser);
  }, []);

  const handleSubmit = (values) => {
    // 這裡應該發送更新請求到後端 API
    console.log('更新的用戶數據:', values);
    setUser({ ...user, ...values });
    setIsEditing(false);
  };

  if (!user) {
    return <Text>加載中...</Text>;
  }

  return (
    <Container size="sm">
      <Paper shadow="xs" p="md" mt="xl">
        <Group position="apart" mb="md">
          <Title order={2}>個人資料</Title>
          <Button
            onClick={() => isEditing ? form.onSubmit(handleSubmit)() : setIsEditing(true)}
          >
            {isEditing ? (
              <>
                <IconDeviceFloppy size="1rem" style={{ marginRight: '0.5rem' }} />
                保存
              </>
            ) : (
              <>
                <IconEdit size="1rem" style={{ marginRight: '0.5rem' }} />
                編輯
              </>
            )}
          </Button>
        </Group>
        <Group align="flex-start" mb="xl">
          <Avatar src={user.avatarUrl} size="xl" radius="md" />
          <Stack spacing="xs">
            {isEditing ? (
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                  label="姓名"
                  {...form.getInputProps('name')}
                  mb="sm"
                />
                <TextInput
                  label="電子郵件"
                  {...form.getInputProps('email')}
                  mb="sm"
                />
                <TextInput
                  label="個人簡介"
                  {...form.getInputProps('bio')}
                  mb="sm"
                />
              </form>
            ) : (
              <>
                <Text size="lg" weight={500}>{user.name}</Text>
                <Text size="sm" color="dimmed">{user.email}</Text>
                <Text>{user.bio}</Text>
              </>
            )}
          </Stack>
        </Group>
      </Paper>
    </Container>
  );
}

export default Profile;
