import React, { useState } from 'react';
import styled from 'styled-components';

interface TaskFilterProps {
  onFilterChange: (filter: string) => void;
}

interface FilterButtonProps {
  $isActive?: boolean; 
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const FilterButton = styled.button<FilterButtonProps>`
  margin: 0 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: linear-gradient(
    90deg,
    rgba(0, 84, 99, 1) 0%,
    rgba(22, 0, 33, 1) 100%
  );
  color: #fff;
  font-size: 16px;

  &:hover {
    background: rgb(90, 15, 144);
    background: linear-gradient(90deg, rgba(90, 15, 144, 1) 0%, rgba(94, 0, 79, 1) 100%);
  }

  ${({ $isActive }) =>
    $isActive &&
    `
    background: rgb(90, 15, 144);
    background: linear-gradient(90deg, rgba(90, 15, 144, 1) 0%, rgba(94, 0, 79, 1) 100%);
  `}
`;

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('pending');

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <ButtonContainer>
      <FilterButton
        $isActive={activeFilter === 'pending'} 
        onClick={() => handleFilterChange('pending')}
      >
        Pending Tasks
      </FilterButton>
      <FilterButton
        $isActive={activeFilter === 'inProgress'} 
        onClick={() => handleFilterChange('inProgress')}
      >
        In Progress
      </FilterButton>
      <FilterButton
        $isActive={activeFilter === 'completed'} 
        onClick={() => handleFilterChange('completed')}
      >
        Completed Tasks
      </FilterButton>
    </ButtonContainer>
  );
};

export default TaskFilter;
