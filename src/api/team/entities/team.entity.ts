import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('teams')
export class Team {
  @PrimaryColumn({ type: 'int', nullable: false })
  id: number;
  
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false })
  employee_id: number;

  @Column({ type: 'tinyint', nullable: false })
  deactivated: number;
}
